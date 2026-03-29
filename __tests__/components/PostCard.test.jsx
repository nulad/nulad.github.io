import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PostCard from "../../app/components/PostCard";

describe("PostCard", () => {
  const requiredProps = {
    title: "Hello World",
    date: "2024-01-01",
    description: "My first blog post",
    slug: "hello-world",
  };

  test("displays post title, date, description, and reading time", () => {
    render(
      <MemoryRouter>
        <PostCard {...requiredProps} readingTime="3 min read" />
      </MemoryRouter>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("My first blog post")).toBeInTheDocument();
    expect(screen.getByText("· 3 min read")).toBeInTheDocument();
  });

  test("link points to correct post slug", () => {
    render(
      <MemoryRouter>
        <PostCard {...requiredProps} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "Hello World" });
    expect(link).toHaveAttribute("href", "/posts/hello-world");
  });

  test("renders with required props", () => {
    render(
      <MemoryRouter>
        <PostCard {...requiredProps} />
      </MemoryRouter>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("missing optional props handled gracefully", () => {
    render(
      <MemoryRouter>
        <PostCard {...requiredProps} readingTime={undefined} />
      </MemoryRouter>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
  });
});
