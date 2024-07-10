import { ApiProperty } from "@nestjs/swagger";
import { GitProviderEnum } from "@utils";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProjectRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	gitName: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	url: string;

	@ApiProperty()
	@IsNumber()
	credentialId: number;

	@ApiProperty({ enum: GitProviderEnum })
	@IsEnum(GitProviderEnum)
	provider: GitProviderEnum;
}
