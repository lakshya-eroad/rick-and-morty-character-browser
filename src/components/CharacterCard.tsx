import React from "react";
import { Link } from "react-router-dom";

interface Character {
  id: string;
  name: string;
  image: string;
}

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <Link
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
  );
};

export default CharacterCard;
