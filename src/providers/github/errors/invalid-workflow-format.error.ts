import { ApiError } from "@errors";
import { ValidationError } from "class-validator";

export class InvalidWorkflowFormatError extends ApiError {
	constructor(errors: ValidationError[]) {
		super({
			code: "github_invalid_workflow_format_err",
			detail: errors,
			message: "Invalid Workflow Format!",
		});
	}
}
