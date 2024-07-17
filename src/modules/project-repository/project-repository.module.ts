import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectRepositoryController } from "./project-repository.controller";
import { ProjectRepositoryService } from "./project-repository.service";
import { Module } from "@nestjs/common";
import { ProjectRepositoryEntity } from "@db/entities";

@Module({
	providers: [ProjectRepositoryService],
	controllers: [ProjectRepositoryController],
	imports: [TypeOrmModule.forFeature([ProjectRepositoryEntity])],
})
export class ProjectRepositoryModule {}
