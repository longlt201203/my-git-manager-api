export interface GithubRepositoryContentTree {
	type: string;
	size: number;
	name: string;
	path: string;
	sha: string;
	url: string;
	git_url: string | null;
	html_url: string | null;
	download_url: string | null;
	content?: string;
	encoding?: string;
	_links: {
		git: string | null;
		html: string | null;
		self: string;
		[k: string]: unknown;
	};
	[k: string]: unknown;
}
