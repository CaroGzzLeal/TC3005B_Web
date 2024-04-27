"use client"

import { goToCharacters, goToFavorites, getCharactersByIds, Character } from '../api/character';
import { useState, useEffect } from "react";
import CharacterCard from '../components/CharacterCard';

export default function Page () {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [characters, setCharacters] = useState<Character[] | Character>();
    const [select, setselect] = useState<boolean>(false);

    useEffect(() => {
        const favoritesTemp = localStorage.getItem("favorites");

        if (favoritesTemp != null) {
            setFavorites(JSON.parse(favoritesTemp));
          }
    }, []);


  useEffect(() => {
    if (!select) {
      if (favorites?.length > 0) {
        getCharactersByIds(favorites).then((characters) => {
          if (!Array.isArray(characters)) {
            characters = [characters];
          }

          setCharacters(characters);
          setselect(true);
        });
      }
    } else {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites])

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

            <div>
                { (favorites.length == 0) && <h1 className="text-black text-4xl ml-5">You have no favorite characters selected</h1> }

                {(!Array.isArray(characters) && characters != null) ? (
                <CharacterCard character={characters} favorites={favorites} setFavorites={setFavorites} />
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {characters?.map((character) => (
                    (favorites.find((id) => id === character.id)) &&
                    <CharacterCard key={character.id} character={character} favorites={favorites} setFavorites={setFavorites} />
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};