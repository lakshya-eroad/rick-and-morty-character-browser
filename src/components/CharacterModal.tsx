import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../graphql/queries";

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  episode: { id: string; name: string }[];
}

const CharacterModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character: Character = data.character;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{character.name}</h2>
          <button
            className="btn btn-sm btn-circle btn-outline"
            onClick={() => navigate(-1)}
          >
            ✕
          </button>
        </div>
        <figure className="mb-4">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </figure>
        <div className="text-left">
          <p className="mb-2">
            <strong>Species:</strong> {character.species}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {character.status}
          </p>
          <div>
            <h3 className="text-lg font-bold mt-4">Episodes</h3>
            <ul className="list-disc pl-5 overflow-y-auto max-h-40">
              {character.episode.map((ep) => (
                <li key={ep.id}>{ep.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
