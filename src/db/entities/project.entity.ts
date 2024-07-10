import { GitProviderEnum } from "@utils";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	gitName: string;

	@Column()
	url: string;

	@Column()
	credentialId: number;

	@Column({ type: "enum", enum: GitProviderEnum })
	provider: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
