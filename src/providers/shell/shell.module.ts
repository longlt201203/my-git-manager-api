import { Module } from "@nestjs/common";
import { ShellService } from "@providers/shell/shell.service";

@Module({
	providers: [ShellService],
	exports: [ShellService],
})
export class ShellModule {}
