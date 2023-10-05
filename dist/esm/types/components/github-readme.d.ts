import React from "react";
import "./github-markdown.css";
import "./github-readme.css";
declare const GitHubReadme: React.FC<{
    username: string;
    repo: string;
    className?: string;
}>;
export default GitHubReadme;
