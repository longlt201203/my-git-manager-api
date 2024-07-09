import { ShellModule } from "@providers/shell";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { Module, OnModuleInit } from "@nestjs/common";
import * as fs from "fs";

@Module({
	imports: [ShellModule],
	providers: [SettingsService],
	controllers: [SettingsController],
})
export class SettingsModule implements OnModuleInit {
	onModuleInit() {
		const appDataDir = "app-data";
		if (!fs.existsSync(appDataDir)) fs.mkdirSync(appDataDir);
	}
}
