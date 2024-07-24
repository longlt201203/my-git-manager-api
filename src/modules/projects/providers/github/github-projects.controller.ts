import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GithubProjectsService } from "./github-projects.service";
import { ApiResponseDto } from "@utils";
import { GithubProjectsQuery } from "./dto";

@Controller("projects/github")
@ApiTags("Github", "Projects")
export class GithubProjectsController {
	constructor(private readonly githubProjectsService: GithubProjectsService) {}

	@Get("repos")
	async listUserRepos(@Query() query: GithubProjectsQuery) {
		const data = await this.githubProjectsService.listUserRepos(query);
		return new ApiResponseDto(data);
	}
}
