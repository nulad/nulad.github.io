import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// Mock the posts lib
vi.mock("../../app/lib/posts", () => ({
  getSortedPosts: vi.fn(() => [
    {
      slug: "hello-world",
      title: "Hello World",
      date: "2026-01-01",
      description: "My first blog post",
    },
    {
      slug: "second-post",
      title: "Second Post",
      date: "2025-12-01",
      description: "Another post",
    },
  ]),
}));

import Home from "../../app/routes/home";

describe("Homepage", () => {
  const mockLoaderData = {
    posts: [
      {
        slug: "hello-world",
        title: "Hello World",
        date: "2026-01-01",
        description: "My first blog post",
      },
      {
        slug: "second-post",
        title: "Second Post",
        date: "2025-12-01",
        description: "Another post",
      },
    ],
  };

  test("renders main heading", () => {
    render(
      <MemoryRouter>
        <Home loaderData={mockLoaderData} />
      </MemoryRouter>
    );

    const mainHeading = screen.getByRole("heading", {
      level: 1,
      name: "nulad.github.io",
    });
    expect(mainHeading).toBeInTheDocument();
  });

  test("renders blog posts", () => {
    const { container } = render(
      <MemoryRouter>
        <Home loaderData={mockLoaderData} />
      </MemoryRouter>
    );

    const articles = container.querySelectorAll("article");
    expect(articles.length).toBeGreaterThan(0);
  });

  test("renders within main element", () => {
    const { container } = render(
      <MemoryRouter>
        <Home loaderData={mockLoaderData} />
      </MemoryRouter>
    );

    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
  });

  test("renders posts with correct structure", () => {
    const { container } = render(
      <MemoryRouter>
        <Home loaderData={mockLoaderData} />
      </MemoryRouter>
    );

    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("nulad.github.io");

    const articles = container.querySelectorAll("article");
    expect(articles.length).toBeGreaterThan(0);

    const firstArticle = articles[0];
    expect(firstArticle.querySelector("h2")).toBeInTheDocument();
    expect(firstArticle.querySelector("time")).toBeInTheDocument();
    expect(firstArticle.querySelector("p")).toBeInTheDocument();
  });

  test("renders InfiniteScroll component", () => {
    const { container } = render(
      <MemoryRouter>
        <Home loaderData={mockLoaderData} />
      </MemoryRouter>
    );

    const sentinel = container.querySelector(
      '[aria-label="infinite-scroll-sentinel"]'
    );
    const endMarker = container.querySelector(
      '[aria-label="infinite-scroll-end"]'
    );

    expect(sentinel || endMarker).toBeInTheDocument();
  });
});
