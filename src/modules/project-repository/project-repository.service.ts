import { ProjectRepositoryEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as fs from "fs";
import { join, resolve } from "path";
import { GitProviderEnum } from "@utils";
import { GithubService } from "@providers/github";
import { ProjectRepositoryAnalysis, ProjectRepositoryPipeLine } from "./dto";

@Injectable()
export class ProjectRepositoryService {
	constructor(
		@InjectRepository(ProjectRepositoryEntity)
		private readonly projectRepositoryEntityRepository: Repository<ProjectRepositoryEntity>,
		private readonly githubService: GithubService,
	) {}

	async viewRepository(id: number) {
		const result: ProjectRepositoryAnalysis = {
			pipeLines: [],
		};
		const entity = await this.projectRepositoryEntityRepository.findOne({
			where: { id: id },
			relations: {
				project: true,
				credential: true,
			},
		});
		const rootPath = resolve(
			"app-data",
			"projects",
			entity.project.localName,
			entity.name,
		);
		const files = fs.readdirSync(rootPath);
		this.viewRepositoryInfo(rootPath, files);
		const pipeLines = await this.analyzeRepositoryPipeLines(
			entity.credential.provider,
			rootPath,
		);
		result.pipeLines = pipeLines;
		return result;
	}

	private viewRepositoryInfo(rootPath: string, files: string[]) {
		const dockerfiles: string[] = [];
		const licenseFiles: string[] = [];
		const mdFiles: string[] = [];
		for (const fileName of files) {
			const filePath = join(rootPath, fileName);
			const stats = fs.statSync(filePath);
			if (!stats.isDirectory()) {
				const lowerFileName = fileName.toLowerCase();
				console.log(lowerFileName);
				if (lowerFileName.includes(".md")) {
					mdFiles.push(fileName);
				} else if (lowerFileName.includes("docker")) {
					dockerfiles.push(fileName);
				} else if (lowerFileName.includes("license")) {
					licenseFiles.push(fileName);
				}
			}
		}
		console.log(mdFiles);
		console.log(dockerfiles);
		console.log(licenseFiles);
	}

	private async analyzeRepositoryPipeLines(provider: string, rootPath: string) {
		switch (provider) {
			case GitProviderEnum.GITHUB: {
				return this.analyzeGithubRepositoryPipeLines(rootPath);
			}
		}
	}

	private async analyzeGithubRepositoryPipeLines(rootPath: string) {
		const pipeLines: ProjectRepositoryPipeLine[] = [];
		const dotGithubPath = resolve(rootPath, ".github");
		if (
			fs.existsSync(dotGithubPath) &&
			fs.statSync(dotGithubPath).isDirectory()
		) {
			const workflowsPath = resolve(dotGithubPath, "workflows");
			if (
				fs.existsSync(workflowsPath) &&
				fs.statSync(workflowsPath).isDirectory()
			) {
				const files = fs.readdirSync(workflowsPath);
				for (const filename of files) {
					const filePath = resolve(workflowsPath, filename);
					const content = fs.readFileSync(filePath).toString();
					const workflow = await this.githubService.readWorkflow(content);
					pipeLines.push({
						name: workflow.name,
						globalVariables: workflow.env,
						jobs: Object.keys(workflow.jobs).map((jobName) => ({
							name: jobName,
							steps: workflow.jobs[jobName].steps.map((stepItem, index) => ({
								name: stepItem.name || `step ${index + 1}`,
								usePlugin: stepItem.uses,
								runCommand: stepItem.run,
								variables: stepItem.with,
							})),
						})),
					});
				}
			}
		}
		return pipeLines;
	}
}
