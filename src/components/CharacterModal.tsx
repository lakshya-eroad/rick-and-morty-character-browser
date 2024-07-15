import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../graphql/queries";

const CharacterModal: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="modal modal-open">
        <div className="modal-box bg-base-200 dark:bg-base-300 max-w-full max-h-full overflow-y-auto flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const character = data.character;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-200 dark:bg-base-300 max-w-full max-h-full overflow-y-auto">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
        <figure className="w-full flex justify-center">
          <img
            src={character.image}
            alt={character.name}
            className="rounded-xl max-w-full h-auto"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-center">{character.name}</h2>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <h3 className="text-lg mt-4">Episode Appearances:</h3>
          <div className="max-h-48 overflow-y-auto">
            <ul className="list-disc list-inside">
              {character.episode.map((ep: any) => (
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
