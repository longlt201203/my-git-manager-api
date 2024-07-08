import { Module, OnModuleInit } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { DbModule } from "@db";
import { CredentialsModule } from "@modules/credentials";
import * as fs from "fs";

@Module({
	imports: [DbModule, CredentialsModule],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule implements OnModuleInit {
	onModuleInit() {
		const localDataDir = "local-data";
		if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir);
	}
}
