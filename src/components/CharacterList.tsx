import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";

interface Character {
  id: string;
  name: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.characters.results.map((character: Character) => (
          <div key={character.id} className="card bg-base-100 shadow-xl">
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
    </div>
  );
};

export default CharacterList;
