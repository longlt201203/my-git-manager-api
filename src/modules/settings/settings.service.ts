import { Injectable } from "@nestjs/common";
import { ShellService } from "@providers/shell";
import * as fs from "fs";
import { SettingsDto, SshKeyPairDto } from "./dto";
import { GetSshKeyPairFailedError } from "./errors";
import { resolve } from "path";

@Injectable()
export class SettingsService {
	constructor(private readonly shellService: ShellService) {}

	getSettings(): SettingsDto {
		const sshKeyPair = this.getSshKeyPair();
		const settingsObj = this.readSettingsJSON();

		return {
			sshKeyPair: sshKeyPair,
			localDataFolder: settingsObj.localDataFolder,
		};
	}

	updateSettings(dto: SettingsDto) {
		delete dto.sshKeyPair;
		dto.localDataFolder = dto.localDataFolder.replaceAll("\\", "/");
		this.updateSettingsJSON(dto);
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
			const privateKey = "*******************************";
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

	private readSettingsJSON() {
		const settingsJSONPath = resolve("app-data", "settings.json");
		const strData = fs.readFileSync(settingsJSONPath).toString();
		return JSON.parse(strData);
	}

	private updateSettingsJSON(settings: any) {
		const settingsJSONPath = resolve("app-data", "settings.json");
		fs.writeFileSync(settingsJSONPath, JSON.stringify(settings, null, 2));
	}
}
