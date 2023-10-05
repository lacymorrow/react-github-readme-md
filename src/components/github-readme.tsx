import React, { useState, useEffect } from "react";
import { parse } from "marked";

import "./github-markdown-styles.css";
import "./github-readme.css";

const GitHubReadme: React.FC<{
  username: string;
  repo: string;
  className?: string;
}> = ({ username, repo, className }) => {
  const [readmeContent, setReadmeContent] = useState<string>("");

  useEffect(() => {
    // Function to fetch the README content from GitHub
    const fetchReadme = async () => {
      try {
        const readmeUrl = await fetch(
          `https://api.github.com/repos/${username}/${repo}/readme`
        )
          .then(async (response) => await response.json())
          .then((data: { download_url: string }) => data.download_url)
          .catch((error) => {
            console.error(error);
          });

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
        console.error("react-github-readme-md:", error);
      }
    };

    // fetchReadmeApi();
    fetchReadme();
  }, [username, repo]);

  if (!readmeContent) {
    return null;
  }

  // Parse the markdown content into HTML
  try {
    const ghContent = parse(readmeContent);
    return (
      <>
        <div className={className}>
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
    console.error("react-github-readme-md:", error);
    return null;
  }
};

export default GitHubReadme;
