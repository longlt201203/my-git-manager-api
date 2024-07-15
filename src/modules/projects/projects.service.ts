import { Project, ProjectRepositoryEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectRequest, ProjectQuery, DeleteProjectDto } from "./dto/requests";
import { ProjectRepositoryTypeEnum } from "@utils";
import { Transactional } from "typeorm-transactional";
import { ProjectNotFoundError } from "./errors";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
		@InjectRepository(ProjectRepositoryEntity)
		private readonly projectRepositoryEntityRepository: Repository<ProjectRepositoryEntity>,
	) {}

	@Transactional()
	async create(dto: ProjectRequest) {
		let entity = this.projectRepository.create({
			name: dto.name,
			description: dto.description,
		});
		entity = await this.projectRepository.save(entity);
		const projectRepositories = dto.childrenRepos.map((item) =>
			this.projectRepositoryEntityRepository.create({
				name: item.name,
				url: item.url,
				type: ProjectRepositoryTypeEnum.CHILD,
				credential: { id: item.credentialId },
				project: entity,
			}),
		);
		if (dto.mainRepo) {
			const mainRepo = this.projectRepositoryEntityRepository.create({
				name: dto.mainRepo.name,
				url: "testURL",
				type: ProjectRepositoryTypeEnum.MAIN,
				credential: { id: dto.mainRepo.credentialId },
				project: entity,
			});
			projectRepositories.push(mainRepo);
		}
		await this.projectRepositoryEntityRepository.save(projectRepositories);
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
}
