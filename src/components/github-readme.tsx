import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import markedLinkifyIt from "marked-linkify-it";
import markedAlert from "marked-alert";

import "./github-readme.scss";

const GitHubReadme: React.FC<{
  username?: string;
  repo?: string;
  src?: string;
  className?: string;
  addHeadingIds?: boolean;
  linkify?: boolean;
}> = ({
  username,
  repo,
  src,
  className,
  addHeadingIds = true,
  linkify = false,
}) => {
  if (!src && !username && !repo) {
    console.error(
      "react-github-readme-md: You must provide either a src or username and repo"
    );
    return null;
  } else if (!src && (!username || !repo)) {
    console.error(
      "react-github-readme-md: You must provide both a username and repo"
    );
    return null;
  }

  const [readmeContent, setReadmeContent] = useState<string>("");

  useEffect(() => {
    // Function to fetch the README content from GitHub
    const fetchReadme = async () => {
      try {
        let readmeUrl = "";

        if (src) {
          // Allow passing a URL directly as a prop
          readmeUrl = src;
        } else {
          readmeUrl = await fetch(
            `https://api.github.com/repos/${username}/${repo}/readme`
          )
            .then(async (response) => await response.json())
            .then((data: { download_url: string }) => data.download_url)
            .catch((error) => {
              console.error(error);
              return "";
            });
        }

        if (!readmeUrl) {
          throw new Error("Failed to fetch README path");
        }

        const response = await fetch(readmeUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch README");
        }

        const data = await response.text();

        if (data) {
          setReadmeContent(data);
        }
      } catch (error) {
        console.error("react-github-readme-md: ", error);
      }
    };

    fetchReadme();
  }, [username, repo, src]);

  if (!readmeContent) {
    return null;
  }

  // Parse the markdown content into HTML
  try {
    // Allow GFM alerts: https://github.com/bent10/marked-extensions/tree/main/packages/alert
    // https://github.com/orgs/community/discussions/16925
    marked.use(markedAlert());

    if (linkify) {
      // Parse links
      marked.use(markedLinkifyIt({}, {}));
    }

    if (addHeadingIds) {
      marked.use(gfmHeadingId({}));
    }
    // Parse headings and add IDs with marked-gfm-heading-id

    const ghContent = marked.parse(readmeContent);
    return (
      <>
        <div className={`github-readme-md ${className ? className : ""}`}>
          <div
            className={`markdown-body`}
            dangerouslySetInnerHTML={{
              __html: ghContent,
            }}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error("react-github-readme-md: ", error);
    return null;
  }
};

export default GitHubReadme;
