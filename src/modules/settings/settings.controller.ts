import { SettingsService } from "./settings.service";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("settings")
@ApiTags("Settings")
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@Get()
	test() {
		return this.settingsService.test();
	}
}
