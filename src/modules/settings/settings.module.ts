import { ShellModule } from "@providers/shell";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { Module, OnModuleInit } from "@nestjs/common";
import * as fs from "fs";
import { resolve } from "path";

@Module({
	imports: [ShellModule],
	providers: [SettingsService],
	exports: [SettingsService],
	controllers: [SettingsController],
})
export class SettingsModule implements OnModuleInit {
	onModuleInit() {
		const appDataDir = "app-data";
		if (!fs.existsSync(appDataDir)) fs.mkdirSync(appDataDir);
		const settingsJSONPath = resolve(appDataDir, "settings.json");
		if (!fs.existsSync(settingsJSONPath))
			fs.writeFileSync(settingsJSONPath, JSON.stringify({}));
	}
}
