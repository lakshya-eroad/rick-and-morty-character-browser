import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  const handleSearch = jest.fn((event) => event.preventDefault());
  const setName = jest.fn();
  const handleClearSearch = jest.fn();

  it("renders the search form correctly", () => {
    render(
      <MockedProvider>
        <SearchForm
          name=""
          setName={setName}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
        />
      </MockedProvider>
    );

    expect(
      screen.getByPlaceholderText(/Search for a character/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls handleSearch with correct parameters on search", () => {
    render(
      <MockedProvider>
        <SearchForm
          name="Rick"
          setName={setName}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
        />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Rick" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith(expect.any(Object)); // Check that it was called with an event object
  });
});
