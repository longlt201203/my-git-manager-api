import { Project } from "@db/entities";

export class ProjectResponse {
	id: number;
	name: string;
	description: string;
	gitName: string;
	url: string;
	credentialId: number;
	provider: string;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(entity: Project): ProjectResponse {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			gitName: entity.gitName,
			url: entity.url,
			credentialId: entity.credentialId,
			provider: entity.provider,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static fromEntities(entities: Project[]) {
		return entities.map(this.fromEntity);
	}
}
