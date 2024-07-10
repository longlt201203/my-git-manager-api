import { Project } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectRequest, ProjectQuery, DeleteProjectDto } from "./dto";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
	) {}

	async create(dto: ProjectRequest) {
		let entity = this.projectRepository.create({
			name: dto.name,
			description: dto.description,
			url: dto.url,
			credentialId: dto.credentialId,
			gitName: dto.gitName,
			provider: dto.provider,
		});
		return this.projectRepository.save(entity);
	}

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

	async delete(dto: DeleteProjectDto) {
		return this.projectRepository.delete(dto.ids);
	}
}
