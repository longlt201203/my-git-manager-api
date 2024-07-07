import { ApiError } from "@errors";

export class GetUserReposError extends ApiError {
	constructor(resData: any, status: number) {
		super({
			code: "github_get_user_repos_err",
			message: "Failed to get user repos",
			detail: resData,
			status: status,
		});
	}
}
