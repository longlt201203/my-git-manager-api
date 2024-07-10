import { Injectable } from "@nestjs/common";
import { ShellService } from "@providers/shell";
import * as fs from "fs";
import { SettingsDto, SshKeyPairDto } from "./dto";
import { GetSshKeyPairFailedError } from "./errors";

@Injectable()
export class SettingsService {
	constructor(private readonly shellService: ShellService) {}

	async getSettings(): Promise<SettingsDto> {
		const sshKeyPair = this.getSshKeyPair();

		return {
			sshKeyPair: sshKeyPair,
		};
	}

	getSshKeyPair(): SshKeyPairDto {
		let data: SshKeyPairDto = undefined;
		const publicKeyFilePath = "/root/.ssh/id_rsa.pub";
		const privateKeyFilePath = "/root/.ssh/id_rsa";
		console.log(
			fs.existsSync(publicKeyFilePath),
			fs.existsSync(privateKeyFilePath),
		);
		if (fs.existsSync(publicKeyFilePath) && fs.existsSync(privateKeyFilePath)) {
			const publicKey = fs.readFileSync(publicKeyFilePath).toString();
			const privateKey = "*******************";
			data = {
				publicKey,
				privateKey,
			};
		}
		return data;
	}

	async generateSshKeyPair() {
		try {
			await this.shellService.generateAndOverrideSshKeyPair();
			return this.getSshKeyPair();
		} catch (err) {
			throw new GetSshKeyPairFailedError(err);
		}
	}
}
