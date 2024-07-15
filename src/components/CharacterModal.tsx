import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_CHARACTER } from "../graphql/queries";
import CharacterDetails from "./CharacterDetails";

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
          <span
            className="loading loading-spinner loading-lg"
            data-testid="loading"
          ></span>
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-200 dark:bg-base-300 max-w-full max-h-full overflow-y-auto">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
        <CharacterDetails character={data.character} />
      </div>
    </div>
  );
};

export default CharacterModal;
