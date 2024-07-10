import { Module } from "@nestjs/common";
import { GithubProjectsController } from "./github-projects.controller";
import { GithubProjectsService } from "./github-projects.service";
import { GithubModule } from "@providers/github";
import { GithubCredentialModule } from "@modules/credentials/providers/github";

@Module({
	providers: [GithubProjectsService],
	controllers: [GithubProjectsController],
	imports: [GithubModule, GithubCredentialModule],
})
export class GithubProjectsModule {}
