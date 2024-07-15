import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_CHARACTERS } from "../graphql/queries";
import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";

interface Character {
  id: string;
  name: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: searchTerm, page },
  });

  useEffect(() => {
    setSearchParams({ name: searchTerm, page: page.toString() });
  }, [searchTerm, page, setSearchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(name);
    setPage(1); // Reset to first page on new search
  };

  const handleClearSearch = () => {
    setName("");
    setSearchTerm("");
    setPage(1); // Reset to first page on clearing search
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <SearchForm
        name={name}
        setName={setName}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.characters.results.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        hasNextPage={!!data.characters.info.next}
        hasPrevPage={!!data.characters.info.prev}
      />
    </div>
  );
};

export default CharacterList;
