import { type StoryFn } from "@storybook/react";
import GitHubReadme from "./github-readme";
declare const _default: import("@storybook/types").ComponentAnnotations<import("@storybook/react/dist/types-0a347bb9").R, {
    username?: string | undefined;
    repo?: string | undefined;
    src?: string | undefined;
    className?: string | undefined;
    addHeadingIds?: boolean | undefined;
    linkify?: boolean | undefined;
}>;
export default _default;
export declare const LightMode: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react/dist/types-0a347bb9").R, {
    username?: string | undefined;
    repo?: string | undefined;
    src?: string | undefined;
    className?: string | undefined;
    addHeadingIds?: boolean | undefined;
    linkify?: boolean | undefined;
}>;
export declare const DarkMode: StoryFn<typeof GitHubReadme>;
