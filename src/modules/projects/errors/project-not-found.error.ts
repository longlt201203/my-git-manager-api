import { ApiError } from "@errors";

export class ProjectNotFoundError extends ApiError {
	constructor() {
		super({
			code: "project_not_found_err",
			message: "Project not found!",
			detail: null,
			status: 404,
		});
	}
}
