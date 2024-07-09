import { Injectable } from "@nestjs/common";
import { ShellService } from "@providers/shell";

@Injectable()
export class SettingsService {
	constructor(private readonly shellService: ShellService) {}

	getSettings() {}

	getSshKeyPair() {}

	generateSshKeyPair() {}

	async test() {
		try {
			await this.shellService.sshKeyGen();
		} catch (err) {
			console.log(err);
		}
		return "OK";
	}
}
