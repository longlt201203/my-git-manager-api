import { ApiError } from "@errors";

export class ProjectRepositoryNotFoundError extends ApiError {
	constructor() {
		super({
			code: "project_repository_not_found_err",
			message: "Project Repository Not Found!",
			detail: null,
			status: 404,
		});
	}
}
