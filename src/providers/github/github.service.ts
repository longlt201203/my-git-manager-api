import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import {
	GetRepoContentsError,
	GetUserInfoError,
	GetUserReposError,
} from "./errors";
import {
	GithubRepository,
	GithubRepositoryContentTree,
	GithubUserInfo,
} from "./dto";

@Injectable()
export class GithubService {
	private readonly API_GET_USER_INFO = "/user";
	private readonly API_GET_USER_REPOS = "/user/repos";
	private readonly API_GET_REPOS_CONTENTS = (
		owner: string,
		repo: string,
		path: string = "/",
	) => `/repos/${owner}/${repo}/contents/${path}`;

	constructor(private readonly httpService: HttpService) {}

	async getUserInfo(pat: string) {
		const response = await firstValueFrom(
			this.httpService
				.get<GithubUserInfo>(this.API_GET_USER_INFO, {
					headers: {
						Authorization: `Bearer ${pat}`,
					},
				})
				.pipe(
					catchError((err: AxiosError) => {
						throw new GetUserInfoError(err.response.data, err.status);
					}),
				),
		);
		return response.data;
	}

	async getUserRepos(pat: string) {
		const response = await firstValueFrom(
			this.httpService
				.get<GithubRepository[]>(this.API_GET_USER_REPOS, {
					headers: {
						Authorization: `Bearer ${pat}`,
					},
				})
				.pipe(
					catchError((err: AxiosError) => {
						throw new GetUserReposError(err.response.data, err.status);
					}),
				),
		);
		return response.data;
	}

	async getRepoContents(
		pat: string,
		owner: string,
		repo: string,
		path: string,
	) {
		const response = await firstValueFrom(
			this.httpService
				.get<GithubRepositoryContentTree | GithubRepositoryContentTree[]>(
					this.API_GET_REPOS_CONTENTS(owner, repo, path),
					{
						headers: {
							Authorization: `Bearer ${pat}`,
						},
					},
				)
				.pipe(
					catchError((err: AxiosError) => {
						throw new GetRepoContentsError(err.response.data, err.status);
					}),
				),
		);
		return response.data;
	}
}
