class SshKeyPair {
	publicKey: string;
	privateKey: string;
}

export class SettingsDto {
	sshKeyPair: SshKeyPair;
}
