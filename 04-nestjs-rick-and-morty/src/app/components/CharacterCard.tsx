import { Character } from "../api/character"
import Image from "next/image";
import { goToCharacter } from "../api/character";

export default function CharacterCard({ character, favorites, setFavorites }: { character: Character, favorites: number[], setFavorites: (favorites: number[]) => void }) {
    const handleFavorite = (characterId: number) => {
      if (favorites.find((id) => id === characterId)) {
        setFavorites(favorites.filter((id) => id !== characterId));
      } else {
        setFavorites([...favorites, characterId]);
      }
    }

    return (
            <div className="bg-white">
                <div className="space-x-28">
                    <button
                        key={character.id}
                        onClick={() => goToCharacter(character.id)}
                        className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
                        > 
                        <Image src={character.image} alt={character.name} className="w-full h-48 object-cover object-center" width={300} height={300} />
                    </button>

                    <button
                      onClick={() => {
                        handleFavorite(character.id);
                      }}
                    >
                      <Image alt="Favorite" src={favorites.find((id) => id === character.id) ? "/filled_star.png" : "/star.png" } width={30} height={30} />
                    </button>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold">{character.name}</h2>
                  <p className="text-gray-800">
                    Status: <span className="text-gray-600">{character.status}</span>
                  </p>
                  <p className="text-gray-800">
                    Species: <span className="text-gray-600">{character.species}</span>
                  </p>
                  <p className="text-gray-800">
                    Gender: <span className="text-gray-600">{character.gender}</span>
                  </p>
                  <div className="flex mt-4">
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {character.origin.name}
                    </span>
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {character.location.name}
                    </span>
                </div>
            </div>
        </div>
    );
}
