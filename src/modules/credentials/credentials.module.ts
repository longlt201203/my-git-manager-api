import { Module } from "@nestjs/common";
import { GithubCredentialModule } from "./providers/github";
@Module({
	imports: [GithubCredentialModule],
})
export class CredentialsModule {}
