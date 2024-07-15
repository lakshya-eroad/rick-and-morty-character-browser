import React from "react";
import CharacterList from "./components/CharacterList";

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Rick and Morty Characters</h1>
      <CharacterList />
    </div>
  );
};

export default App;
