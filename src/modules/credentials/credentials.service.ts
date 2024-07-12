import { CredentialEntity } from "@db/entities";
import { DeleteCredentialRequest } from "@modules/credentials/dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CredentialsService {
	constructor(
		@InjectRepository(CredentialEntity)
		private readonly credentialRepository: Repository<CredentialEntity>,
	) {}

	async getMany(provider: string) {
		return this.credentialRepository.find({ where: { provider: provider } });
	}

	delete(dto: DeleteCredentialRequest) {
		return this.credentialRepository.delete(dto.ids);
	}
}
