import { Project } from "@db/entities";

export class ProjectInfoResponse {
	id: number;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(entity: Project): ProjectInfoResponse {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static fromEntities(entities: Project[]) {
		return entities.map(this.fromEntity);
	}
}
