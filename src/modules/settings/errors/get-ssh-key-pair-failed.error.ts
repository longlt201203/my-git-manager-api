import { ApiError } from "@errors";

export class GetSshKeyPairFailedError extends ApiError {
	constructor(err: any) {
		super({
			code: "get_ssh_key_pair_failed_err",
			message: "Failed to get ssh key pair",
			detail: err,
		});
	}
}
