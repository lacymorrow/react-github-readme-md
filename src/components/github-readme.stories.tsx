import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import GitHubReadme from "./github-readme";

const meta: Meta<typeof GitHubReadme> = {
  title: "lacymorrow/react-github-readme-md",
  component: GitHubReadme,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GitHubReadme>;

export const LightMode: Story = {
  args: {
    username: "lacymorrow",
    repo: "react-github-readme-md",
    src: "",
  },
};

export const DarkMode: Story = {
  args: {
    username: "lacymorrow",
    repo: "react-github-readme-md",
    src: "",
  },
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "black" }}>
        <Story />
      </div>
    ),
  ],
};
