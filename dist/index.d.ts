import React from 'react';

declare const GitHubReadme: React.FC<{
    username?: string;
    repo?: string;
    src?: string;
    className?: string;
    addHeadingIds?: boolean;
    linkify?: boolean;
}>;

export { GitHubReadme };
