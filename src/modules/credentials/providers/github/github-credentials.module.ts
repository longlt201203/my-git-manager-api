import { Module } from "@nestjs/common";
import { GithubCredentialsService } from "./github-credentials.service";
import { GithubCredentialsController } from "./github-credentials.controller";
import { GithubModule } from "@providers/github";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CredentialEntity } from "@db/entities";

@Module({
	controllers: [GithubCredentialsController],
	providers: [GithubCredentialsService],
	exports: [GithubCredentialsService],
	imports: [TypeOrmModule.forFeature([CredentialEntity]), GithubModule],
})
export class GithubCredentialModule {}
