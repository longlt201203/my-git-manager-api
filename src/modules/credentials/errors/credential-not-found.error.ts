import { ApiError } from "@errors";

export class CredentialNotFoundError extends ApiError {
	constructor() {
		super({
			code: "credential_not_found_err",
			message: "Credential not found",
			detail: null,
			status: 404,
		});
	}
}
