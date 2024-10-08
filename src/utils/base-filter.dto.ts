import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class BaseFilterDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page?: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	take?: number;
}
