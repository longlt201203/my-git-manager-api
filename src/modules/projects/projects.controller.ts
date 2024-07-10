import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ApiTags } from "@nestjs/swagger";
import {
	DeleteProjectDto,
	ProjectQuery,
	ProjectRequest,
	ProjectResponse,
} from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("projects")
@ApiTags("Projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Post("delete")
	async delete(@Body() dto: DeleteProjectDto) {
		await this.projectsService.delete(dto);
		return new ApiResponseDto(null, null, "Deleted");
	}

	@Post()
	async create(@Body() dto: ProjectRequest) {
		await this.projectsService.create(dto);
		return new ApiResponseDto(null, null, "Created");
	}

	@Get()
	async list(@Query() query: ProjectQuery) {
		const [data, count] = await this.projectsService.getMany(query);
		return new ApiResponseDto(ProjectResponse.fromEntities(data), {
			page: query.page,
			take: query.take,
			totalRecord: count,
			totalPage: Math.ceil(count / (query.take || 10)),
		});
	}
}
