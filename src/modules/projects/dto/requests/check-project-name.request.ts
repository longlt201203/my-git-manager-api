import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CheckProjectNameRequest {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	id?: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;
}
