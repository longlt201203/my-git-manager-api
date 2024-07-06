import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "@utils";
import { initializeTransactionalContext } from "typeorm-transactional";

async function bootstrap() {
	initializeTransactionalContext();
	const app = await NestFactory.create(AppModule);
	await app.listen(Env.LISTEN_PORT);
}
bootstrap();
