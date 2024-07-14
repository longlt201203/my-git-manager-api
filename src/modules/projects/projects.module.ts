import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { GithubProjectsModule } from "./providers/github";
import { Project, ProjectRepositoryEntity } from "@db/entities";

@Module({
	imports: [
		TypeOrmModule.forFeature([Project, ProjectRepositoryEntity]),
		GithubProjectsModule,
	],
	providers: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule {}
