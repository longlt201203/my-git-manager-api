import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class GithubCredentialEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	pat: string;

	@Column()
	username: string;

	@Column()
	avatar: string;

	@Column()
	name: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
