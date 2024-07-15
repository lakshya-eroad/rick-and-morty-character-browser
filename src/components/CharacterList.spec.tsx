/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import CharacterList from "./CharacterList";
import { GET_CHARACTERS } from "../graphql/queries";

const charactersMock = {
  request: {
    query: GET_CHARACTERS,
    variables: { name: "", page: 1 },
  },
  result: {
    data: {
      characters: {
        results: [
          { id: "1", name: "Rick Sanchez", image: "rick_image_url" },
          { id: "2", name: "Morty Smith", image: "morty_image_url" },
        ],
        info: { next: 2, prev: null },
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_CHARACTERS,
    variables: { name: "", page: 1 },
  },
  error: new Error("An error occurred"),
};

describe("CharacterList", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });

  it("renders page data correctly after loading", async () => {
    render(
      <MockedProvider mocks={[charactersMock]} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByText("Clear")).toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });
  });

  test("displays error message on error", async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
