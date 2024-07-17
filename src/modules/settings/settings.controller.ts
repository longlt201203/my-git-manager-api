import { SettingsDto } from "./dto";
import { SettingsService } from "./settings.service";
import { Body, Controller, Get, Put } from "@nestjs/common";
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
	getSettings() {
		const data = this.settingsService.getSettings();
		return new ApiResponseDto(data);
	}

	@Put()
	updateSettings(@Body() dto: SettingsDto) {
		this.settingsService.updateSettings(dto);
		return new ApiResponseDto(null, null, "Update settings successfully!");
	}
}
