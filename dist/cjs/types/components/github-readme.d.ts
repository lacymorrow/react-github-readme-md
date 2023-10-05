import React from "react";
import "./github-markdown-styles.css";
import "./github-readme.css";
declare const GitHubReadme: React.FC<{
    username: string;
    repo: string;
    className?: string;
    addHeadingIds?: boolean;
    linkify?: boolean;
}>;
export default GitHubReadme;
