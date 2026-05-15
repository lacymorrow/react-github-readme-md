import React from 'react';

type Props = {
    username?: string;
    repo?: string;
    src?: string;
    className?: string;
    addHeadingIds?: boolean;
    linkify?: boolean;
    theme?: "light" | "dark" | "auto";
};
declare const GitHubReadme: React.FC<Props>;

export { GitHubReadme };
