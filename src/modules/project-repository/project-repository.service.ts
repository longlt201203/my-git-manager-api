import { ProjectRepositoryEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as fs from "fs";
import { join, resolve } from "path";

@Injectable()
export class ProjectRepositoryService {
	constructor(
		@InjectRepository(ProjectRepositoryEntity)
		private readonly projectRepositoryEntityRepository: Repository<ProjectRepositoryEntity>,
	) {}

	async viewRepository(id: number) {
		const entity = await this.projectRepositoryEntityRepository.findOne({
			where: { id: id },
			relations: {
				project: true,
			},
		});
		const rootPath = resolve(
			"app-data",
			"projects",
			entity.project.localName,
			entity.name,
		);
		const files = fs.readdirSync(rootPath);
		const dockerfiles: string[] = [];
		const envFiles: string[] = [];
		const licenseFiles: string[] = [];
		const mdFiles: string[] = [];
		for (const fileName of files) {
			const filePath = join(rootPath, fileName);
			const stats = fs.statSync(filePath);
			if (!stats.isDirectory()) {
				const lowerFileName = fileName.toLowerCase();
				console.log(lowerFileName);
				if (lowerFileName.includes(".env")) {
					envFiles.push(fileName);
				} else if (lowerFileName.includes(".md")) {
					mdFiles.push(fileName);
				} else if (lowerFileName.includes("docker")) {
					dockerfiles.push(fileName);
				} else if (lowerFileName.includes("license")) {
					licenseFiles.push(fileName);
				}
			}
		}
		console.log(envFiles);
		console.log(mdFiles);
		console.log(dockerfiles);
		console.log(licenseFiles);
	}
}
