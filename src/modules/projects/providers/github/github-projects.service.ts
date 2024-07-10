import { GithubCredentialsService } from "@modules/credentials/providers/github";
import { Injectable } from "@nestjs/common";
import { GithubService } from "@providers/github";
import { GitRepoDto } from "../../dto";

@Injectable()
export class GithubProjectsService {
	constructor(
		private readonly githubService: GithubService,
		private readonly githubCredentialsService: GithubCredentialsService,
	) {}

	async listUserRepos(credentialId: number): Promise<GitRepoDto[]> {
		const credential =
			await this.githubCredentialsService.getByIdOrFail(credentialId);
		const repos = await this.githubService.getUserRepos(credential.pat);
		return repos.map((item) => ({
			name: item.name,
			url: item.ssh_url,
		}));
	}
}
