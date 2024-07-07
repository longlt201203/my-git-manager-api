import { Module } from "@nestjs/common";
import { GithubService } from "./github.service";
import { HttpModule } from "@nestjs/axios";

@Module({
	providers: [GithubService],
	exports: [GithubService],
	imports: [HttpModule.register({ baseURL: "https://api.github.com" })],
})
export class GithubModule {}
