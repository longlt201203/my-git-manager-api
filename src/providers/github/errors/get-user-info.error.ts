import { ApiError } from "@errors";

export class GetUserInfoError extends ApiError {
	constructor(resData: any, status: number) {
		super({
			code: "github_get_user_info_err",
			message: "Failed to get user info from GitHub",
			detail: resData,
			status: status,
		});
	}
}
