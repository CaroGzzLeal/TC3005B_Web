"use client"

import React, { useEffect, useState } from 'react';
import { getCharacters, CharacterResponse, goToCharacters, goToFavorites } from './api/character';
import CharacterCard from './components/CharacterCard';

export default function Page () {
  const [characters, setCharacters] = useState<CharacterResponse | null>(null);
  const [favorites,  setFavorites] = useState<number[]>([]);
  const [select, setSelect] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getCharacters();
            setCharacters(data);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites != null) {
      setFavorites(JSON.parse(favorites));
    }

    setSelect(true);
  }, []);

  useEffect(() => {
    if (select) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <header className="pb-5">
        <div className="bg-gray-800 text-white p-4 flex justify-between">
          <button onClick={() => goToCharacters()} className="mr-auto">
            Characters
          </button>

          <button onClick={() => goToFavorites()} className="ml-auto">
            Favorites
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {characters?.results.map((character) => (
          <CharacterCard key={character.id} character={character} favorites={favorites} setFavorites={setFavorites} />
        ))}
      </div>
    </div>
  );
};

