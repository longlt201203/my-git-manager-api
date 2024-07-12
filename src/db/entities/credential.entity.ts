import { GitProviderEnum } from "@utils";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class CredentialEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	avatar: string;

	@Column()
	name: string;

	@Column({ type: "enum", enum: GitProviderEnum })
	provider: string;

	@Column({ type: "text" })
	authInfo: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
