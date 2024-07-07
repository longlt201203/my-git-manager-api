import { GithubCredentialEntity } from "@db/entities";

export class GithubCredentialResponse {
	id: number;
	username: string;
	avatar: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(entity: GithubCredentialEntity): GithubCredentialResponse {
		return {
			id: entity.id,
			username: entity.username,
			avatar: entity.avatar,
			name: entity.name,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static fromEntities(entities: GithubCredentialEntity[]) {
		return entities.map(this.fromEntity);
	}
}
