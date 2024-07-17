import { ApiProperty } from "@nestjs/swagger";
import { SshKeyPairDto } from "./ssh-key-pair.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SettingsDto {
	sshKeyPair?: SshKeyPairDto;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	localDataFolder?: string;
}
