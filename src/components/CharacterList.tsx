import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";

interface Character {
  id: string;
  name: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: searchTerm },
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(name);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search for a character"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setName("");
            setSearchTerm("");
          }}
        >
          Clear
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.characters.results.map((character: Character) => (
          <Link
            key={character.id}
            to={`/character/${character.id}`} // Navigate to character details route
            className="card bg-base-100 shadow-xl cursor-pointer"
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
