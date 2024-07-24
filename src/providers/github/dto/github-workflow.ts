import { Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";

export class GithubWorkflowJobStep {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	uses?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	run?: string;

	@IsOptional()
	@IsObject()
	with?: any;
}

export class GithubWorkflowJob {
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => GithubWorkflowJobStep)
	steps: GithubWorkflowJobStep[];
}

export class GithubWorkflowJobs {
	[key: string]: GithubWorkflowJob;
}

export class GithubWorkflow {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsObject()
	on: any;

	@IsObject()
	@IsOptional()
	env?: any;

	@IsObject()
	@Type(() => GithubWorkflowJobs)
	jobs: GithubWorkflowJobs;
}
