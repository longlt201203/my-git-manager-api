import {
	DeleteCredentialRequest,
	GitCredentialResponse,
} from "@modules/credentials/dto";
import { CredentialsService } from "./credentials.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiResponseDto, GitProviderEnum } from "@utils";

@Controller("credentials")
@ApiTags("Credentials")
export class CredentialsController {
	constructor(private readonly credentialsService: CredentialsService) {}

	@Get(":provider")
	@ApiParam({ name: "provider", enum: GitProviderEnum })
	async getCredentials(@Param("provider") provider: string) {
		const data = await this.credentialsService.getMany(provider);
		return new ApiResponseDto(GitCredentialResponse.fromEntities(data));
	}

	@Post("delete")
	async deleteCredentialRequest(@Body() dto: DeleteCredentialRequest) {
		await this.credentialsService.delete(dto);
		return new ApiResponseDto(null, null, "Success!");
	}
}
