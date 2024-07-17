import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { GithubProjectsModule } from "./providers/github";
import { Project, ProjectRepositoryEntity } from "@db/entities";
import { resolve } from "path";
import * as fs from "fs";
import { ShellModule } from "@providers/shell";
import { SettingsModule } from "@modules/settings";

@Module({
	imports: [
		TypeOrmModule.forFeature([Project, ProjectRepositoryEntity]),
		GithubProjectsModule,
		ShellModule,
		SettingsModule,
	],
	providers: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule implements OnModuleInit {
	onModuleInit() {
		const projectsFolder = resolve("app-data", "projects");
		if (!fs.existsSync(projectsFolder)) fs.mkdirSync(projectsFolder);
	}
}
