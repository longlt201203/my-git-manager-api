import { SettingsService } from "./settings.service";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiResponseDto } from "@utils";

@Controller("settings")
@ApiTags("Settings")
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@Get("generate-ssh-key-pair")
	async generateSshKeyPair() {
		const data = await this.settingsService.generateSshKeyPair();
		return new ApiResponseDto(data);
	}

	@Get()
	async getSettings() {
		const data = await this.settingsService.getSettings();
		return new ApiResponseDto(data);
	}
}
