import { ApiProperty } from "@nestjs/swagger";
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { ProjectRepositoryRequest } from "./project-repository.request";
import { Type } from "class-transformer";
import { MainProjectRepositoryRequest } from "./main-project-repository.request";

export class ProjectRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ type: MainProjectRepositoryRequest, required: false })
	@IsOptional()
	@ValidateNested()
	@Type(() => MainProjectRepositoryRequest)
	mainRepo?: MainProjectRepositoryRequest;

	@ApiProperty({ type: ProjectRepositoryRequest, isArray: true })
	@ValidateNested({ each: true })
	@Type(() => ProjectRepositoryRequest)
	childrenRepos: ProjectRepositoryRequest[];
}
