import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// Mock the MarkdownContent component
vi.mock("../../../app/components/MarkdownContent", () => ({
  default: function MockMarkdownContent({ content }) {
    return <div data-testid="markdown-content">{content}</div>;
  },
}));

import PostPage from "../../../app/routes/post";

describe("Post Page", () => {
  const mockPost = {
    slug: "hello-world",
    title: "Hello World",
    date: "2024-01-01",
    description: "My first blog post",
    excerpt: "Welcome to my blog",
    content: "# Welcome to My Blog\n\nThis is my first blog post.",
    tags: ["welcome", "intro"],
  };

  describe("when post exists", () => {
    test("renders post title", () => {
      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      const title = screen.getByRole("heading", {
        level: 1,
        name: "Hello World",
      });
      expect(title).toBeInTheDocument();
    });

    test("renders post date", () => {
      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
    });

    test("renders post excerpt when available", () => {
      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      expect(screen.getByText("Welcome to my blog")).toBeInTheDocument();
    });

    test("renders post content using MarkdownContent", () => {
      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      const markdownContent = screen.getByTestId("markdown-content");
      expect(markdownContent).toBeInTheDocument();
      expect(markdownContent).toHaveTextContent(
        "# Welcome to My Blog This is my first blog post."
      );
    });

    test("renders without excerpt when not provided", () => {
      const postWithoutExcerpt = { ...mockPost };
      delete postWithoutExcerpt.excerpt;

      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: postWithoutExcerpt }} />
        </MemoryRouter>
      );

      expect(
        screen.queryByText("Welcome to my blog")
      ).not.toBeInTheDocument();
    });

    test("renders without date when not provided", () => {
      const postWithoutDate = { ...mockPost };
      delete postWithoutDate.date;

      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: postWithoutDate }} />
        </MemoryRouter>
      );

      expect(screen.queryByText(/January/)).not.toBeInTheDocument();
    });

    test("renders Untitled Post when title is missing", () => {
      const postWithoutTitle = { ...mockPost };
      delete postWithoutTitle.title;

      render(
        <MemoryRouter>
          <PostPage loaderData={{ post: postWithoutTitle }} />
        </MemoryRouter>
      );

      expect(
        screen.getByRole("heading", { level: 1, name: "Untitled Post" })
      ).toBeInTheDocument();
    });
  });

  describe("page structure", () => {
    test("renders within main element with correct classes", () => {
      const { container } = render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      const mainElement = container.querySelector("main");
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass(
        "container",
        "mx-auto",
        "px-4",
        "py-8",
        "max-w-4xl"
      );
    });

    test("renders article element", () => {
      const { container } = render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      const article = container.querySelector("article");
      expect(article).toBeInTheDocument();
    });

    test("renders header element with post metadata", () => {
      const { container } = render(
        <MemoryRouter>
          <PostPage loaderData={{ post: mockPost }} />
        </MemoryRouter>
      );

      const article = container.querySelector("article");
      const header = article.querySelector("header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("mb-8");
    });
  });
});
