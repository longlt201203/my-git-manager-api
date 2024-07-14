import { ApiProperty } from "@nestjs/swagger";
import { GitProviderEnum } from "@utils";
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { ProjectRepositoryRequest } from "./project-repository.request";
import { Type } from "class-transformer";

export class ProjectRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ type: ProjectRepositoryRequest, required: false })
	@IsOptional()
	@ValidateNested()
	@Type(() => ProjectRepositoryRequest)
	mainRepo?: ProjectRepositoryRequest;

	@ApiProperty({ type: ProjectRepositoryRequest, isArray: true })
	@ValidateNested({ each: true })
	@Type(() => ProjectRepositoryRequest)
	childrenRepos: ProjectRepositoryRequest[];
}
