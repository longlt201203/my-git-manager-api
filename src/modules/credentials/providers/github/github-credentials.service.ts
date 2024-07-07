import { GithubCredentialEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { DeleteGithubCredentialRequest, GithubAuthorizeRequest } from "./dto";
import { CredentialNotFoundError } from "../../errors";
import { GithubService } from "@providers/github";
import { PatExistedError } from "./errors";

@Injectable()
export class GithubCredentialsService {
	constructor(
		@InjectRepository(GithubCredentialEntity)
		private readonly githubCredentialRepository: Repository<GithubCredentialEntity>,
		private readonly githubService: GithubService,
	) {}

	getAll() {
		return this.githubCredentialRepository.find();
	}

	async getByIdOrFail(id: number) {
		const entity = await this.githubCredentialRepository.findOne({
			where: {
				id,
			},
		});

		if (!entity) {
			throw new CredentialNotFoundError();
		}

		return entity;
	}

	async authorize(dto: GithubAuthorizeRequest) {
		const isPatExisted = await this.githubCredentialRepository.findOne({
			where: {
				pat: dto.pat,
			},
		});

		if (isPatExisted) {
			throw new PatExistedError();
		}

		const profile = await this.githubService.getUserInfo(dto.pat);

		const entity = this.githubCredentialRepository.create({
			pat: dto.pat,
			avatar: profile.avatar_url,
			name: profile.name,
			username: profile.login,
		});

		return await this.githubCredentialRepository.save(entity);
	}

	async reAuthorize(id: number, dto: GithubAuthorizeRequest) {
		const entity = await this.getByIdOrFail(id);
		const isPatExisted = await this.githubCredentialRepository.findOne({
			where: {
				pat: dto.pat,
			},
		});

		if (isPatExisted) {
			throw new PatExistedError();
		}

		const profile = await this.githubService.getUserInfo(dto.pat);

		return await this.githubCredentialRepository.save({
			...entity,
			pat: dto.pat,
			avatar: profile.avatar_url,
			name: profile.name,
			username: profile.login,
		});
	}

	async fetchInfomation(id: number) {
		const entity = await this.getByIdOrFail(id);
		const profile = await this.githubService.getUserInfo(entity.pat);

		return await this.githubCredentialRepository.save({
			...entity,
			avatar: profile.avatar_url,
			name: profile.name,
			username: profile.login,
		});
	}

	remove(dto: DeleteGithubCredentialRequest) {
		return this.githubCredentialRepository.delete({ id: In(dto.ids) });
	}
}
