import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";

interface Character {
  id: string;
  name: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name, page },
  });

  useEffect(() => {
    setSearchParams({ name, page: page.toString() });
  }, [name, page, setSearchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1); // Reset to first page on new search
    setSearchParams({ name, page: "1" });
  };

  const handleClearSearch = () => {
    setName("");
    setPage(1); // Reset to first page on clearing search
    setSearchParams({ name: "", page: "1" });
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
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.characters.results.map((character: Character) => (
          <Link
            key={character.id}
            to={`/character/${character.id}`}
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
      <div className="flex justify-between mt-4">
        <button
          className={`btn ${
            !data.characters.info.prev ? "btn-disabled" : "btn-primary"
          }`}
          onClick={() => setPage(page - 1)}
          disabled={!data.characters.info.prev}
        >
          Previous
        </button>
        <button
          className={`btn ${
            !data.characters.info.next ? "btn-disabled" : "btn-primary"
          }`}
          onClick={() => setPage(page + 1)}
          disabled={!data.characters.info.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
