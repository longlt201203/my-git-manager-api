import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "@utils";
import { initializeTransactionalContext } from "typeorm-transactional";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	initializeTransactionalContext();
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.enableCors({ origin: "*" });

	const config = new DocumentBuilder()
		.setTitle("My Git Manager API")
		.setDescription("The My Git Manager API description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/docs", app, document);

	await app.listen(Env.LISTEN_PORT);
}
bootstrap();
