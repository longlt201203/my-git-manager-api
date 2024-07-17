import { Project, ProjectRepositoryEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import {
	ProjectRequest,
	ProjectQuery,
	DeleteProjectDto,
	CheckProjectNameRequest,
	ProjectRepositoryRequest,
} from "./dto/requests";
import { ProjectRepositoryTypeEnum } from "@utils";
import { Transactional } from "typeorm-transactional";
import { ProjectNotFoundError } from "./errors";
import { ShellService } from "@providers/shell";
import { join } from "path";
import { SettingsService } from "@modules/settings";
import { ValidationError } from "class-validator";
import { ApiValidationError } from "@errors";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
		@InjectRepository(ProjectRepositoryEntity)
		private readonly projectRepositoryEntityRepository: Repository<ProjectRepositoryEntity>,
		private readonly shellService: ShellService,
		private readonly settingsService: SettingsService,
	) {}

	@Transactional()
	async create(dto: ProjectRequest) {
		await this.validate(dto);

		const settings = this.settingsService.getSettings();
		const projectLocalName = dto.name.toLowerCase().replaceAll(" ", "-");
		const projectLocalPath = join(
			settings.localDataFolder,
			"app-data",
			"projects",
			projectLocalName,
		);
		let entity = this.projectRepository.create({
			name: dto.name,
			description: dto.description,
			localPath: projectLocalPath,
			localName: projectLocalName,
		});
		entity = await this.projectRepository.save(entity);
		let projectRepositories = dto.childrenRepos.map((item) => {
			const localName = item.name.toLowerCase().replaceAll(" ", "-");
			const localPath = join(projectLocalPath, localName);
			return this.projectRepositoryEntityRepository.create({
				name: item.name,
				url: item.url,
				htmlUrl: item.htmlUrl || undefined,
				type: ProjectRepositoryTypeEnum.CHILD,
				credential: { id: item.credentialId },
				project: entity,
				localPath: localPath,
			});
		});
		// if (dto.mainRepo) {
		// 	const mainRepo = this.projectRepositoryEntityRepository.create({
		// 		name: dto.mainRepo.name,
		// 		url: "testURL",
		// 		type: ProjectRepositoryTypeEnum.MAIN,
		// 		credential: { id: dto.mainRepo.credentialId },
		// 		project: entity,
		// 	});
		// 	projectRepositories.push(mainRepo);
		// }
		projectRepositories =
			await this.projectRepositoryEntityRepository.save(projectRepositories);
		await Promise.all(
			projectRepositories.map((v) => {
				const parts = v.localPath.split("/");
				return this.shellService.gitClone(
					v.url,
					projectLocalName,
					parts[parts.length - 1],
				);
			}),
		);
	}

	@Transactional()
	async getOneOrFail(id: number) {
		const entity = await this.projectRepository.findOne({
			where: { id: id },
			relations: { childrenRepos: true },
		});
		if (!entity) throw new ProjectNotFoundError();
		return entity;
	}

	@Transactional()
	async getMany(query: ProjectQuery): Promise<[Project[], number]> {
		const take = query.take || 10;
		const page = query.page || 1;
		return Promise.all([
			this.projectRepository.find({
				take: take,
				skip: take * (page - 1),
				order: { updatedAt: "DESC", createdAt: "DESC" },
			}),
			this.projectRepository.count(),
		]);
	}

	@Transactional()
	async delete(dto: DeleteProjectDto) {
		return this.projectRepository.delete(dto.ids);
	}

	@Transactional()
	async checkProjectName(dto: CheckProjectNameRequest) {
		return this.isProjectNameExisted(dto.name, dto.id);
	}

	private async validate(dto: ProjectRequest, id?: number) {
		const errors: ValidationError[] = [];
		const result = await Promise.all([
			this.isProjectNameExisted(dto.name, id),
			this.isDuplicatedProjectRepository(dto.childrenRepos),
		]);

		if (result[0]) {
			const error = new ValidationError();
			error.property = "name";
			error.constraints = { isUnique: "Project name is already existed!" };
			errors.push(error);
		}

		if (result[1]) {
			const error = new ValidationError();
			error.property = "childrenRepos";
			error.constraints = { isNotDuplicated: "Duplicated repository!" };
			errors.push(error);
		}

		if (errors.length > 0) {
			throw new ApiValidationError(errors);
		}
	}

	private async isProjectNameExisted(name: string, id?: number) {
		return this.projectRepository.exists({
			where: {
				localName: name.toLowerCase().replaceAll(" ", "-"),
				id: id && Not(id),
			},
		});
	}

	private isDuplicatedProjectRepository(
		childrenRepos: ProjectRepositoryRequest[],
	) {
		for (let i = 0; i < childrenRepos.length - 1; i++) {
			for (let j = i + 1; j < childrenRepos.length; j++) {
				if (childrenRepos[i].name == childrenRepos[j].name) return true;
			}
		}
		return false;
	}
}
