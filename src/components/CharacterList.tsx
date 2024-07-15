import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import CharacterModal from "./CharacterModal";

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  episode: { id: string; name: string }[];
}

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page, name: searchTerm },
  });

  useEffect(() => {
    refetch();
  }, [page, searchTerm, refetch]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(name);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for a character"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.characters.results.map((character: Character) => (
          <div
            key={character.id}
            className="card bg-base-100 shadow-xl cursor-pointer"
            onClick={() => setSelectedCharacter(character)}
          >
            <figure>
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{character.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={!data.characters.info.next}
        >
          Next
        </button>
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default CharacterList;
