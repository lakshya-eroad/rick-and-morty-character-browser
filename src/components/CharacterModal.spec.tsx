import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GET_CHARACTER } from "../graphql/queries";
import CharacterModal from "./CharacterModal";

const characterMock = {
  request: {
    query: GET_CHARACTER,
    variables: { id: "1" },
  },
  result: {
    data: {
      character: {
        id: "1",
        name: "Rick Sanchez",
        species: "Human",
        status: "Alive",
        episode: [
          { id: "1", name: "Pilot" },
          { id: "2", name: "Lawnmower Dog" },
        ],
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_CHARACTER,
    variables: { id: "1" },
  },
  error: new Error("An error occurred"),
};

describe("CharacterModal", () => {
  it("displays loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={["/character/1"]}>
          <CharacterModal />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });

  it("displays an error message on query failure", async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter initialEntries={["/character/1"]}>
          <CharacterModal />
        </MemoryRouter>
      </MockedProvider>
    );

    await screen.findByText(/Error/i);
  });

  it("renders CharacterModal with character data", async () => {
    render(
      <MockedProvider mocks={[characterMock]} addTypename={false}>
        <MemoryRouter initialEntries={["/character/1"]}>
          <Routes>
            <Route path="/character/:id" element={<CharacterModal />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();

    const characterName = await screen.findByText(/rick sanchez/i);
    expect(characterName).toBeInTheDocument();

    const characterSpecies = await screen.findByText(/human/i);
    expect(characterSpecies).toBeInTheDocument();

    const characterStatus = await screen.findByText(/alive/i);
    expect(characterStatus).toBeInTheDocument();

    const episodeOne = await screen.findByText(/pilot/i);
    expect(episodeOne).toBeInTheDocument();

    const episodeTwo = await screen.findByText(/lawnmower dog/i);
    expect(episodeTwo).toBeInTheDocument();
  });
});
