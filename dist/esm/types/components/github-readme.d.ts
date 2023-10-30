import React from "react";
import "./github-readme.scss";
declare const GitHubReadme: React.FC<{
    username?: string;
    repo?: string;
    src?: string;
    className?: string;
    addHeadingIds?: boolean;
    linkify?: boolean;
}>;
export default GitHubReadme;
