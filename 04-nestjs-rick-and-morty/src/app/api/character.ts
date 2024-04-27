"use server"

import { redirect } from 'next/navigation'

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image : string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharacterResponse {
    map(arg0: (character: any) => import("react").JSX.Element): import("react").ReactNode;
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: Character[];
}

export async function getCharacters(): Promise<CharacterResponse> {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    return res.json();
}

export async function getCharacterById(id: number): Promise<Character> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return res.json();
}

export async function getCharactersByIds(ids: number[]): Promise<Character[] | Character> {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`);
    return response.json();
}

export async function goToCharacters() {
    redirect('/');
}

export async function goToFavorites() {
    redirect('/favorites');
}

export async function goToCharacter(id: number) {
    redirect(`/character/${id}`)
}
