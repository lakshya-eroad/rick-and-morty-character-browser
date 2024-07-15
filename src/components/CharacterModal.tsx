import React from "react";

interface Episode {
  id: string;
  name: string;
}

interface CharacterModalProps {
  character: {
    id: string;
    name: string;
    image: string;
    species: string;
    status: string;
    episode: Episode[];
  } | null;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  if (!character) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-4/5 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <button
            className="btn btn-sm btn-circle btn-outline"
            onClick={onClose}
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
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <div>
          <h3 className="text-lg font-bold mt-4">Episodes</h3>
          <ul className="list-disc pl-5">
            {character.episode.map((ep) => (
              <li key={ep.id}>{ep.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
