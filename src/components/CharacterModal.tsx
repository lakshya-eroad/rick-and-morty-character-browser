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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{character.name}</h2>
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
