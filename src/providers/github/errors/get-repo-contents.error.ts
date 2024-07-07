import { ApiError } from "@errors";

export class GetRepoContentsError extends ApiError {
	constructor(resData: any, status: number) {
		super({
			code: "github_get_repo_contents_err",
			message: "Failed to get repo contents",
			status: status,
			detail: resData,
		});
	}
}
