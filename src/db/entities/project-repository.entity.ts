import { ProjectRepositoryTypeEnum } from "@utils";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./project.entity";
import { CredentialEntity } from "./credential.entity";

@Entity()
export class ProjectRepositoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	url: string;

	@Column()
	name: string;

	@ManyToOne(() => CredentialEntity, { eager: true })
	@JoinColumn()
	credential: CredentialEntity;

	@Column({ type: "enum", enum: ProjectRepositoryTypeEnum })
	type: string;

	@ManyToOne(() => Project, (project) => project.childrenRepos, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	project: Project;
}
