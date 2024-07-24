import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import {
	GetRepoContentsError,
	GetUserInfoError,
	GetUserReposError,
	InvalidWorkflowFormatError,
} from "./errors";
import {
	GithubRepository,
	GithubRepositoryContentTree,
	GithubUserInfo,
	GithubUserReposRequest,
	GithubWorkflow,
	GithubWorkflowJob,
} from "./dto";
import * as YAML from "yaml";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class GithubService {
	private readonly API_GET_USER_INFO = "/user";
	private readonly API_GET_USER_REPOS = `/user/repos`;
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
						throw new GetUserInfoError(
							err.response ? err.response.data : err.message,
							err.status,
						);
					}),
				),
		);
		return response.data;
	}

	async getUserRepos(input: GithubUserReposRequest) {
		const response = await firstValueFrom(
			this.httpService
				.get<GithubRepository[]>(
					this.API_GET_USER_REPOS +
						`?page=${input.page || 1}&per_page=${input.per_page || 100}`,
					{
						headers: {
							Authorization: `Bearer ${input.pat}`,
						},
					},
				)
				.pipe(
					catchError((err: AxiosError) => {
						throw new GetUserReposError(
							err.response ? err.response.data : err.message,
							err.status,
						);
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
						throw new GetRepoContentsError(
							err.response ? err.response.data : err.message,
							err.status,
						);
					}),
				),
		);
		return response.data;
	}

	async readWorkflow(workflowContent: string) {
		const obj = YAML.parse(workflowContent);
		const data = plainToInstance(GithubWorkflow, obj);
		const errors = await validate(data);

		if (errors.length > 0) {
			throw new InvalidWorkflowFormatError(errors);
		}

		const promises = [];
		for (const key in data.jobs) {
			const tmp = plainToInstance(GithubWorkflowJob, data.jobs[key]);
			promises.push(validate(tmp));
		}

		const errorsList = await Promise.all(promises);
		errorsList.forEach((item) => errors.push(...item));

		if (errors.length > 0) {
			throw new InvalidWorkflowFormatError(errors);
		}

		return data;
	}
}
