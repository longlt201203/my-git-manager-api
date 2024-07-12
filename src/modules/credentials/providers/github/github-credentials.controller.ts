import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GithubCredentialsService } from "./github-credentials.service";
import { ApiTags } from "@nestjs/swagger";
import { GithubAuthorizeRequest } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("credentials/github")
@ApiTags("Github", "Credentials")
export class GithubCredentialsController {
	constructor(
		private readonly githubCredentialsService: GithubCredentialsService,
	) {}

	@Get("fetch-information/:id")
	async fetchInformation(@Param("id") id: string) {
		const data = await this.githubCredentialsService.fetchInfomation(+id);
		return new ApiResponseDto(data);
	}

	@Post("authorize")
	async authorize(@Body() dto: GithubAuthorizeRequest) {
		await this.githubCredentialsService.authorize(dto);
		return new ApiResponseDto(null, null, "Success");
	}

	@Post("re-authorize/:id")
	async reauthorize(
		@Param("id") id: string,
		@Body() dto: GithubAuthorizeRequest,
	) {
		await this.githubCredentialsService.reAuthorize(+id, dto);
		return new ApiResponseDto(null, null, "Success");
	}
}
