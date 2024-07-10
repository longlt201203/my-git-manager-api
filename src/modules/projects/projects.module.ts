import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { GithubProjectsModule } from "./providers/github";
import { Project } from "@db/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Project]), GithubProjectsModule],
	providers: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule {}
