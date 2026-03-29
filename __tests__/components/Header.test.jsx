import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "../../app/components/Header";

describe("Header", () => {
  test('renders site title "nulad"', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("nulad")).toBeInTheDocument();
  });

  test('title links to homepage "/"', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "nulad" });
    expect(link).toHaveAttribute("href", "/");
  });

  test("applies brutalist styling classes", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const header = screen.getByText("nulad").closest("header");
    expect(header).toHaveClass("border-b-4");
    expect(header).toHaveClass("border-black");
  });
});
