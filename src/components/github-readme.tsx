import React, { useState, useEffect } from "react";
import { parse } from "marked";

import "./github-markdown.css";

const GitHubReadme: React.FC<{ username: string; repo: string }> = ({
  username,
  repo,
}) => {
  const [readmeContent, setReadmeContent] = useState<string>("");

  useEffect(() => {
    // Function to fetch the README content from GitHub
    const fetchReadme = async () => {
      try {
        const readmeUrl = await fetch(
          `https://api.github.com/repos/${username}/${repo}/readme`
        )
          .then((response) => response.json())
          .then((data) => data.download_url)
          .catch((error) => console.error(error));

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
        <div
          className="markdown-body my-8"
          dangerouslySetInnerHTML={{
            __html: ghContent,
          }}
        />
      </>
    );
  } catch (error) {
    console.error("react-github-readme-md:", error);
    return null;
  }
};

export default GitHubReadme;
