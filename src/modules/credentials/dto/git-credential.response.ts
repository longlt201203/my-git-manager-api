import { CredentialEntity } from "@db/entities";

export class GitCredentialResponse {
	id: number;
	username: string;
	avatar: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(entity: CredentialEntity): GitCredentialResponse {
		return {
			id: entity.id,
			username: entity.username,
			avatar: entity.avatar,
			name: entity.name,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static fromEntities(entities: CredentialEntity[]) {
		return entities.map(this.fromEntity);
	}
}
