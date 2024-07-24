import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GithubProjectsQuery {
	@ApiProperty()
	@IsNumber()
	@Type(() => Number)
	credentialId: number;
}
