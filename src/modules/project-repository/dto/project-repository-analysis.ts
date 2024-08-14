import { ProjectRepositoryResponse } from "./project-repository.response";
import { ProjectRepositoryPipeLine } from "./project-repository-pipe-line";

export class ProjectRepositoryAnalysis {
	info: ProjectRepositoryResponse;
	pipeLines: ProjectRepositoryPipeLine[];
	readme?: string;
}
