import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GithubProjectsService } from "./github-projects.service";

@Controller("projects/github")
@ApiTags("Github", "Projects")
export class GithubProjectsController {
	constructor(private readonly githubProjectsService: GithubProjectsService) {}

	@Get("repos")
	async listUserRepos(@Query("credentialId") credentialId: string) {
		const data = await this.githubProjectsService.listUserRepos(+credentialId);
		return data;
	}
}
