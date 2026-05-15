import React, { useState, useEffect } from "react";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import markedLinkifyIt from "marked-linkify-it";
import markedAlert from "marked-alert";

import "./github-readme.scss";

type Props = {
  username?: string;
  repo?: string;
  src?: string;
  className?: string;
  addHeadingIds?: boolean;
  linkify?: boolean;
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
}) => {
  const [readmeContent, setReadmeContent] = useState<string>("");

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
        if (!readmeUrl) {
          const apiRes = await fetch(
            `https://api.github.com/repos/${username}/${repo}/readme`
          );
          if (!apiRes.ok) {
            throw new Error(
              `Failed to look up README (${apiRes.status} ${apiRes.statusText})`
            );
          }
          const data: unknown = await apiRes.json();
          const downloadUrl =
            data && typeof data === "object" && "download_url" in data
              ? (data as { download_url: unknown }).download_url
              : undefined;
          if (typeof downloadUrl !== "string" || !downloadUrl) {
            throw new Error("README response missing download_url");
          }
          readmeUrl = downloadUrl;
        }

        const response = await fetch(readmeUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch README (${response.status} ${response.statusText})`
          );
        }
        const data = await response.text();
        if (!cancelled && data) setReadmeContent(data);
      } catch (error) {
        console.error("react-github-readme-md:", error);
      }
    };

    fetchReadme();
    return () => {
      cancelled = true;
    };
  }, [username, repo, src]);

  if (!readmeContent) return null;

  try {
    const parser = getParser(addHeadingIds, linkify);
    const ghContent = parser.parse(readmeContent) as string;
    return (
      <div className={`github-readme-md ${className ? className : ""}`}>
        <div
          className="markdown-body"
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
