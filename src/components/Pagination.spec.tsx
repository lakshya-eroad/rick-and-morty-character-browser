import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("disables the Previous button when hasPrevPage is false", () => {
    render(
      <Pagination
        page={1}
        setPage={jest.fn()}
        hasPrevPage={false}
        hasNextPage={true}
      />
    );

    const prevButton = screen.getByText("Previous");

    expect(prevButton).toBeDisabled();
  });

  it("enables the Previous button when hasPrevPage is true", () => {
    render(
      <Pagination
        page={2}
        setPage={jest.fn()}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );

    const prevButton = screen.getByText("Previous");

    expect(prevButton).not.toBeDisabled();
  });

  it("disables the Next button when hasNextPage is false", () => {
    render(
      <Pagination
        page={1}
        setPage={jest.fn()}
        hasPrevPage={true}
        hasNextPage={false}
      />
    );

    const nextButton = screen.getByText("Next");

    expect(nextButton).toBeDisabled();
  });

  it("enables the Next button when hasNextPage is true", () => {
    render(
      <Pagination
        page={1}
        setPage={jest.fn()}
        hasPrevPage={false}
        hasNextPage={true}
      />
    );

    const nextButton = screen.getByText("Next");

    expect(nextButton).not.toBeDisabled();
  });

  it("clicking the Previous button decreases the page number by 1", () => {
    const setPage = jest.fn();
    render(
      <Pagination
        page={2}
        setPage={setPage}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );

    const prevButton = screen.getByText("Previous");

    fireEvent.click(prevButton);

    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("clicking the Next button increases the page number by 1", () => {
    const setPage = jest.fn();
    render(
      <Pagination
        page={1}
        setPage={setPage}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );

    const nextButton = screen.getByText("Next");

    fireEvent.click(nextButton);

    expect(setPage).toHaveBeenCalledWith(2);
  });
});
