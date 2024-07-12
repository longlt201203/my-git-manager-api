import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteCredentialRequest {
	@ApiProperty({ type: [Number] })
	@IsNumber({}, { each: true })
	ids: number[];
}
