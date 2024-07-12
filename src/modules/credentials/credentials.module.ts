import { Module } from "@nestjs/common";
import { GithubCredentialModule } from "./providers/github";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CredentialEntity } from "@db/entities";
@Module({
	imports: [
		TypeOrmModule.forFeature([CredentialEntity]),
		GithubCredentialModule,
	],
	providers: [CredentialsService],
	controllers: [CredentialsController],
})
export class CredentialsModule {}
