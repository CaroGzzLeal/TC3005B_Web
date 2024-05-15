
import { z } from 'zod'

export const ZCharacter = z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
    species: z.string(),
    type: z.string(),
    gender: z.string(),
    origin: z.object({
        name: z.string(),
        url: z.string(),
    }),
    location: z.object({
        name: z.string(),
        url: z.string(),
    }),
    image : z.string(),
    episode: z.array(z.string()),
    url: z.string(),
    created: z.string(),
})

export const ZCharacterResponse = z.object({
    info: z.object({
      count: z.number(),
      pages: z.number(),
      next: z.string(),
      prev: z.string(),
    }),
    results: z.array(ZCharacter)
})

export type CharacterResponse = z.infer<typeof ZCharacterResponse>
export type Character = z.infer<typeof ZCharacter>




/*

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
    results: typeof Character[];
}

*/