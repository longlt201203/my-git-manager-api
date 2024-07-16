import { Injectable } from "@nestjs/common";
import { exec } from "child_process";

@Injectable()
export class ShellService {
	executeShell(...shellScripts: string[]) {
		return new Promise<string>((resolve, reject) => {
			exec(shellScripts.join(" "), (err, stdout) => {
				if (err) {
					reject(err);
				} else {
					resolve(stdout);
				}
			});
		});
	}

	generateAndOverrideSshKeyPair() {
		return this.executeShell(
			"rm -f ~/.ssh/id_rsa &&",
			"rm -f ~/.ssh/id_rsa.pub &&",
			"ssh-keygen -q -f ~/.ssh/id_rsa -t rsa -N ''",
		);
	}

	echo(text: string) {
		return this.executeShell("echo", text);
	}

	gitClone(repositoryUrl: string, alias?: string) {
		return this.executeShell(
			"cd /app/app-data/projects &&",
			`git clone ${repositoryUrl}${alias ? ` ${alias}` : ""}`,
		);
	}
}
