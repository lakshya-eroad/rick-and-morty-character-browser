import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

describe("CharacterCard", () => {
  it("renders character card correctly", () => {
    render(
      <Router>
        <CharacterCard character={mockCharacter} />
      </Router>
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      "src",
      mockCharacter.image
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/character/${mockCharacter.id}`
    );
  });
});
