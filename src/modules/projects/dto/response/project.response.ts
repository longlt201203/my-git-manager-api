import { Project } from "@db/entities";
import { ProjectInfoResponse } from "./project-info.response";
import { ProjectRepositoryResponse } from "./project-repository.response";
import { ProjectRepositoryTypeEnum } from "@utils";

export class ProjectResponse extends ProjectInfoResponse {
	mainRepo?: ProjectRepositoryResponse;
	childrenRepos: ProjectRepositoryResponse[];

	static fromEntity(entity: Project): ProjectResponse {
		let mainRepo = undefined;
		let childrenRepos = [];
		for (const item of entity.childrenRepos) {
			if (item.type == ProjectRepositoryTypeEnum.MAIN) {
				mainRepo = { ...item };
			} else {
				childrenRepos.push(item);
			}
		}

		return {
			...ProjectInfoResponse.fromEntity(entity),
			mainRepo: mainRepo,
			childrenRepos: ProjectRepositoryResponse.fromEntities(childrenRepos),
		};
	}

	static fromEntities(entities: Project[]) {
		return entities.map(this.fromEntity);
	}
}
