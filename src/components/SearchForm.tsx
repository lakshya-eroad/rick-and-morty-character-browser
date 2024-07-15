import React from "react";

interface SearchFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClearSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  name,
  setName,
  handleSearch,
  handleClearSearch,
}) => {
  return (
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
  );
};

export default SearchForm;
