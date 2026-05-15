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

export const Auto: Story = {
  args: {
    username: "lacymorrow",
    repo: "react-github-readme-md",
    src: "",
    theme: "auto",
  },
};

export const LightMode: Story = {
  args: {
    username: "lacymorrow",
    repo: "react-github-readme-md",
    src: "",
    theme: "light",
  },
};

export const DarkMode: Story = {
  args: {
    username: "lacymorrow",
    repo: "react-github-readme-md",
    src: "",
    theme: "dark",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#0d1117" }}>
        <Story />
      </div>
    ),
  ],
};
