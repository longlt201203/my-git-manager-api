import { Injectable } from "@nestjs/common";
import { exec } from "child_process";
import * as fs from "fs";

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

	gitClone(repositoryUrl: string, projectFolderName: string, alias?: string) {
		const cdFolder = `/app/app-data/projects/${projectFolderName}`;
		if (!fs.existsSync(cdFolder)) fs.mkdirSync(cdFolder);
		return this.executeShell(
			`cd ${cdFolder} &&`,
			`git clone ${repositoryUrl}${alias ? ` ${alias}` : ""}`,
		);
	}
}
