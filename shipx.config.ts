import { execFileSync } from "node:child_process";

export default {
	// Plain npm library: no cargo workspace, and the sibling homebrew-tap is not ours.
	cargoWorkspaces: [],
	git: {
		releaseBranch: "main",
	},
	steps: {
		// npm publish is delegated to .github/workflows/release.yml (OIDC trusted
		// publishing). No laptop or agent npm token needed. See LAC-4944.
		npm: false,
		githubRelease: true,
		homebrew: false,
		// shipx does not yet treat npm: false as delegated, so check the tag
		// workflow by hand (LAC-6348).
		watchCi: false,
	},
	hooks: {
		// package.json "files" ships dist/, and nothing in this repo builds on publish.
		preNpm: ({ config }) => {
			execFileSync("npm", ["run", "build"], { cwd: config.root, stdio: "inherit" });
		},
	},
};
