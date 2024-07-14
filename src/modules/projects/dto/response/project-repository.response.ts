import { ProjectRepositoryEntity } from "@db/entities";
import { GitCredentialResponse } from "@modules/credentials/dto";

export class ProjectRepositoryResponse {
	id: number;
	name: string;
	url: string;
	credential: GitCredentialResponse;
	type: string;

	static fromEntity(
		entity: ProjectRepositoryEntity,
	): ProjectRepositoryResponse {
		return {
			id: entity.id,
			name: entity.name,
			url: entity.url,
			credential: GitCredentialResponse.fromEntity(entity.credential),
			type: entity.type,
		};
	}

	static fromEntities(entities: ProjectRepositoryEntity[]) {
		return entities.map(this.fromEntity);
	}
}
