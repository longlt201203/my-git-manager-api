import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { DbModule } from "@db";
import { CredentialsModule } from "@modules/credentials";
import { SettingsModule } from "@modules/settings";
import { ProjectsModule } from "@modules/projects";

@Module({
	imports: [DbModule, CredentialsModule, SettingsModule, ProjectsModule],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
