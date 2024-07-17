import { ProjectRepositoryEntity } from "@db/entities";
import { GitCredentialResponse } from "@modules/credentials/dto";

export class ProjectRepositoryResponse {
	id: number;
	name: string;
	url: string;
	credential: GitCredentialResponse;
	type: string;
	localPath: string;
	htmlUrl?: string;

	static fromEntity(
		entity: ProjectRepositoryEntity,
	): ProjectRepositoryResponse {
		return {
			id: entity.id,
			name: entity.name,
			url: entity.url,
			credential: GitCredentialResponse.fromEntity(entity.credential),
			type: entity.type,
			localPath: entity.localPath,
			htmlUrl: entity.htmlUrl,
		};
	}

	static fromEntities(entities: ProjectRepositoryEntity[]) {
		return entities.map(this.fromEntity);
	}
}
