import { createContext, useContext, useState } from "react";

const CharacterQueryContext = createContext();

export const CharacterQueryProvider = ({ children }) => {
  const [characterQuery, setCharacterQuery] = useState("");

  const clearCharacterQuery = () => setCharacterQuery("");

  return (
    <CharacterQueryContext.Provider
      value={{ characterQuery, setCharacterQuery, clearCharacterQuery }}
    >
      {children}
    </CharacterQueryContext.Provider>
  );
};

export const useCharacterQuery = () => {
  const context = useContext(CharacterQueryContext);
  if (!context) {
    throw new Error(
      "useCharacterQuery must be used within a CharacterQueryProvider"
    );
  }
  return context;
};
