class ProjectRepositoryPipeLineJobStep {
	name: string;
	runCommand?: string;
	usePlugin?: string;
	variables?: any;
}

class ProjectRepositoryPipeLineJob {
	name: string;
	steps: ProjectRepositoryPipeLineJobStep[];
}

export class ProjectRepositoryPipeLine {
	name: string;
	globalVariables?: any;
	jobs: ProjectRepositoryPipeLineJob[];
}
