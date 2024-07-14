import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ApiTags } from "@nestjs/swagger";
import { DeleteProjectDto, ProjectQuery, ProjectRequest } from "./dto/requests";
import { ApiResponseDto } from "@utils";
import { ProjectInfoResponse, ProjectResponse } from "./dto/response";

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
		return new ApiResponseDto(ProjectInfoResponse.fromEntities(data), {
			page: query.page,
			take: query.take,
			totalRecord: count,
			totalPage: Math.ceil(count / (query.take || 10)),
		});
	}

	@Get(":id")
	async getOneById(@Param("id") id: string) {
		const data = await this.projectsService.getOneOrFail(+id);
		return new ApiResponseDto(ProjectResponse.fromEntity(data));
	}
}
