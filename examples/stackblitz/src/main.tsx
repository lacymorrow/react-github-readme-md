import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { GitHubReadme } from "react-github-readme-md";

function App() {
	const [username, setUsername] = useState("lacymorrow");
	const [repo, setRepo] = useState("react-github-readme-md");

	return (
		<>
			<form
				onSubmit={(e) => e.preventDefault()}
				style={{ display: "flex", gap: ".5rem", marginBottom: "1.5rem" }}
			>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="username"
					style={{ padding: ".5rem", borderRadius: 6, border: "1px solid #30363d", background: "#161b22", color: "#c9d1d9", flex: 1 }}
				/>
				<input
					value={repo}
					onChange={(e) => setRepo(e.target.value)}
					placeholder="repo"
					style={{ padding: ".5rem", borderRadius: 6, border: "1px solid #30363d", background: "#161b22", color: "#c9d1d9", flex: 1 }}
				/>
			</form>
			<GitHubReadme username={username} repo={repo} />
		</>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
