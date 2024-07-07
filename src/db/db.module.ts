import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { datasource } from "./datasource";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource, DataSourceOptions } from "typeorm";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => datasource.options,
			dataSourceFactory: async (options: DataSourceOptions) =>
				addTransactionalDataSource(new DataSource(options)),
		}),
	],
})
export class DbModule {}
