import React, { useState, useEffect } from "react";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import markedLinkifyIt from "marked-linkify-it";
import markedAlert from "marked-alert";

import {
  buildReadmeBase,
  rewriteRelativeUrls,
  type ReadmeBase,
} from "./relative-urls";

import "./github-readme.scss";

type Props = {
  username?: string;
  repo?: string;
  src?: string;
  className?: string;
  addHeadingIds?: boolean;
  linkify?: boolean;
  theme?: "light" | "dark" | "auto";
};

// Build a parser per option-combination once, instead of mutating the global
// `marked` singleton on every render.
const parserCache = new Map<string, Marked>();
const getParser = (addHeadingIds: boolean, linkify: boolean): Marked => {
  const key = `${addHeadingIds ? 1 : 0}${linkify ? 1 : 0}`;
  let parser = parserCache.get(key);
  if (!parser) {
    parser = new Marked();
    // GFM alerts: https://github.com/bent10/marked-extensions/tree/main/packages/alert
    parser.use(markedAlert());
    if (addHeadingIds) parser.use(gfmHeadingId({}));
    if (linkify) parser.use(markedLinkifyIt({}, {}));
    parserCache.set(key, parser);
  }
  return parser;
};

const GitHubReadme: React.FC<Props> = ({
  username,
  repo,
  src,
  className,
  addHeadingIds = true,
  linkify = false,
  theme = "auto",
}) => {
  const [readme, setReadme] = useState<{
    markdown: string;
    base?: ReadmeBase;
  }>({ markdown: "" });

  useEffect(() => {
    if (!src && !username && !repo) {
      console.error(
        "react-github-readme-md: You must provide either a src or username and repo"
      );
      return;
    }
    if (!src && (!username || !repo)) {
      console.error(
        "react-github-readme-md: You must provide both a username and repo"
      );
      return;
    }

    let cancelled = false;

    const fetchReadme = async () => {
      try {
        let readmeUrl = src;
        // Repo-relative path of the README, used to find the repository root.
        let readmePath: string | undefined;
        if (!readmeUrl) {
          const apiRes = await fetch(
            `https://api.github.com/repos/${username}/${repo}/readme`
          );
          if (!apiRes.ok) {
            throw new Error(
              `Failed to look up README (${apiRes.status} ${apiRes.statusText})`
            );
          }
          const body: unknown = await apiRes.json();
          const data: Record<string, unknown> =
            body && typeof body === "object"
              ? (body as Record<string, unknown>)
              : {};
          const downloadUrl = data.download_url;
          if (typeof downloadUrl !== "string" || !downloadUrl) {
            throw new Error("README response missing download_url");
          }
          readmeUrl = downloadUrl;
          readmePath = typeof data.path === "string" ? data.path : undefined;
        }

        const response = await fetch(readmeUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch README (${response.status} ${response.statusText})`
          );
        }
        const markdown = await response.text();
        if (!cancelled && markdown) {
          setReadme({
            markdown,
            base: buildReadmeBase(readmeUrl, readmePath),
          });
        }
      } catch (error) {
        console.error("react-github-readme-md:", error);
      }
    };

    fetchReadme();
    return () => {
      cancelled = true;
    };
  }, [username, repo, src]);

  if (!readme.markdown) return null;

  try {
    const parser = getParser(addHeadingIds, linkify);
    const parsed = parser.parse(readme.markdown) as string;
    const ghContent = readme.base
      ? rewriteRelativeUrls(parsed, readme.base)
      : parsed;
    return (
      <div className={`github-readme-md ${className ? className : ""}`}>
        <div
          className="markdown-body"
          data-theme={theme !== "auto" ? theme : undefined}
          dangerouslySetInnerHTML={{ __html: ghContent }}
        />
      </div>
    );
  } catch (error) {
    console.error("react-github-readme-md:", error);
    return null;
  }
};

export default GitHubReadme;
