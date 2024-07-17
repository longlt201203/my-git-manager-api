import { Project } from "@db/entities";

export class ProjectInfoResponse {
	id: number;
	name: string;
	description: string;
	localPath: string;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(entity: Project): ProjectInfoResponse {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			localPath: entity.localPath,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static fromEntities(entities: Project[]) {
		return entities.map(this.fromEntity);
	}
}
