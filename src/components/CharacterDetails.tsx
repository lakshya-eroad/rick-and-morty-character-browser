import React from "react";

interface CharacterDetailsProps {
  character: {
    image: string;
    name: string;
    species: string;
    status: string;
    episode: { id: string; name: string }[];
  };
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <>
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
    </>
  );
};

export default CharacterDetails;
