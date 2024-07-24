import { ProjectRepositoryService } from "./project-repository.service";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiResponseDto } from "@utils";

@Controller("project-repository")
@ApiTags("Project Repository")
export class ProjectRepositoryController {
	constructor(
		private readonly projectRepositoryService: ProjectRepositoryService,
	) {}

	@Get(":id")
	async viewRepo(@Param("id") id: string) {
		const data = await this.projectRepositoryService.viewRepository(+id);
		return new ApiResponseDto(data);
	}
}
