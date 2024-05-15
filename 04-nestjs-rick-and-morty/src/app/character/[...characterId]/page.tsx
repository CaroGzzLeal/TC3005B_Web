"use client";

import React from 'react';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { getCharacterById, goToCharacters, goToFavorites } from '@/actions/actions';
import { Character } from '../../api/character';


export default function CharacterPage({ params }: { params: { characterId: number } }) {
    const [character, setCharacter] = useState<Character>();

    useEffect(() => {
        getCharacterById(params.characterId ?? -1)
            .then((data) => setCharacter(data))
            .catch((error) => console.error(error));
    }, []);


    if (!character) {
        return <div>Loading character...</div>;
    }

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

            <div className="flex flex-col md:flex-row p-5">
                <div className="md:flex-1">
                    <Image src={character.image} alt={character.name} className="object-cover object-center rounded-lg" width={400} height={400} />
                </div>
                <div className="md:flex-1 md:pl-4">
                    <h2 className="text-2xl font-bold my-2">{character.name}</h2>
                    <p className="text-lg">{character.status} - {character.gender}</p>
                    <p className="mt-1">Origin: {character.origin.name}</p>
                    <p className="mt-1">Location: {character.location.name}</p>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold mb-2">Episodes</h3>
                        <div className="h-64 overflow-auto">
                            <ul className="list-disc pl-5">
                                {character.episode.map((episode, index) => (
                                    <li key={index}><a href={episode} className="text-blue-600 hover:text-blue-800 visited:text-purple-600">{episode}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
