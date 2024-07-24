import { GithubCredentialsService } from "@modules/credentials/providers/github";
import { Injectable } from "@nestjs/common";
import { GithubService } from "@providers/github";
import { GitRepoDto } from "../../dto/response";
import { GithubProjectsQuery } from "./dto";
import { GithubRepository } from "@providers/github/dto";

@Injectable()
export class GithubProjectsService {
	constructor(
		private readonly githubService: GithubService,
		private readonly githubCredentialsService: GithubCredentialsService,
	) {}

	async listUserRepos(query: GithubProjectsQuery): Promise<GitRepoDto[]> {
		const credential = await this.githubCredentialsService.getByIdOrFail(
			query.credentialId,
		);
		const repos: GithubRepository[] = [];

		let stop = false;
		let page = 1;

		while (!stop) {
			const tmp = await this.githubService.getUserRepos({
				pat: credential.authInfo,
				page: page,
			});
			if (tmp.length > 0) {
				repos.push(...tmp);
				page++;
			} else {
				stop = true;
			}
		}

		return repos.map((item, index) => ({
			id: index + 1,
			name: item.name,
			url: item.ssh_url,
			htmlUrl: item.html_url,
		}));
	}
}
