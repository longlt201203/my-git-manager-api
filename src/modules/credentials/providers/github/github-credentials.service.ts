import { CredentialEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GithubAuthorizeRequest } from "./dto";
import { CredentialNotFoundError } from "../../errors";
import { GithubService } from "@providers/github";
import { GitProviderEnum } from "@utils";

@Injectable()
export class GithubCredentialsService {
	constructor(
		@InjectRepository(CredentialEntity)
		private readonly credentialRepository: Repository<CredentialEntity>,
		private readonly githubService: GithubService,
	) {}

	async getByIdOrFail(id: number) {
		const entity = await this.credentialRepository.findOne({
			where: {
				id,
				provider: GitProviderEnum.GITHUB,
			},
		});

		if (!entity) {
			throw new CredentialNotFoundError();
		}

		return entity;
	}

	async authorize(dto: GithubAuthorizeRequest) {
		const profile = await this.githubService.getUserInfo(dto.pat);

		const entity = this.credentialRepository.create({
			authInfo: dto.pat,
			avatar: profile.avatar_url,
			name: profile.name,
			username: profile.login,
		});

		return await this.credentialRepository.save(entity);
	}

	async reAuthorize(id: number, dto: GithubAuthorizeRequest) {
		const entity = await this.getByIdOrFail(id);

		const profile = await this.githubService.getUserInfo(dto.pat);

		return await this.credentialRepository.save({
			...entity,
			authInfo: dto.pat,
			avatar: profile.avatar_url,
			name: profile.name,
			username: profile.login,
		});
	}

	async fetchInfomation(id: number) {
		const entity = await this.getByIdOrFail(id);
		const profile = await this.githubService.getUserInfo(entity.authInfo);

		return await this.credentialRepository.save({
			...entity,
			avatar: profile.avatar_url,
			name: profile.name,
			username: profile.login,
		});
	}
}
