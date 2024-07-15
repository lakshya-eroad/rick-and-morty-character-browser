import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterDetails from "./CharacterDetails";

const mockCharacter = {
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  episode: [
    { id: "1", name: "Pilot" },
    { id: "2", name: "Lawnmower Dog" },
  ],
};

describe("CharacterDetails", () => {
  it("renders character details correctly", () => {
    render(<CharacterDetails character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      "src",
      mockCharacter.image
    );
    mockCharacter.episode.forEach((ep) => {
      expect(screen.getByText(ep.name)).toBeInTheDocument();
    });
  });

  it("handles character with no episodes gracefully", () => {
    const characterWithoutEpisodes = { ...mockCharacter, episode: [] };

    render(<CharacterDetails character={characterWithoutEpisodes} />);

    const episodesList = screen.queryByText("Episodes:");

    expect(episodesList).toBeNull();
  });
});
