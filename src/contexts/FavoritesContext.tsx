import React, { createContext, useState, useContext, useEffect } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (dogId: string) => {
    setFavorites((prev) => [...new Set([...prev, dogId])]);
  };

  const removeFavorite = (dogId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== dogId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
