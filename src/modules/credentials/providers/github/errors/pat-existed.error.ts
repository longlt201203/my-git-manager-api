import { ApiError } from "@errors";

export class PatExistedError extends ApiError {
	constructor() {
		super({
			code: "pat_existed",
			message: "This Personal Access Token is existed",
			detail: null,
		});
	}
}
