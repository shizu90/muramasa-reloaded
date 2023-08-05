import { UserData } from "./userData"

export interface ReviewData {
    id: number | null,
    text: string,
    media: MediaData,
    code: number,
    reviewedAt: string,
    reviewer: UserData
}

export interface MediaData {
    id: number | null,
    code: number,
    name: string,
    imgUrl: string,
    type: string,
    favorited: 0 | 1, 
    count: number,
    length: number,
    status: number,
    score: number,
    review: ReviewData | null
}

export interface JikanImageObject {
    image_url: string,
    small_image_url: string,
    large_image_url: string
}

export interface JikanAiredObject {
    from: string,
    to: string
}

export interface JikanGenreObject {
    mal_id: number,
    type: string,
    name: string,
    url: string
}

export interface JikanStudioObject {
    mal_id: number,
    type: string,
    name: string,
    url: string
}

export interface JikanPersonObject {
    mal_id: number,
    url: string,
    images: {jpg: JikanImageObject, webp: JikanImageObject},
    name: string,
}

interface JikanMedia {
    mal_id: number,
    url: string,
    images: {jpg: JikanImageObject, webp: JikanImageObject},
    title: string,
    title_english: string,
    title_japanese: string,
    type: string,
    source: string,
    status: string,
    score: number,
    popularity: number,
    favorites: number,
    synopsis: string,
    year: number,
    rank: number,
    duration: string,
    genres: Array<JikanGenreObject>,
    characters: Array<JikanCharacterCard> | null,
    news: Array<JikanNew> | null
}

export interface JikanAnime extends JikanMedia{
    source: string,
    episodes: number,
    aired: JikanAiredObject,
    season: string,
    studios: Array<JikanStudioObject>,
    staff: Array<JikanStaff> | null
}

export interface JikanManga extends JikanMedia {
    chapters: number,
    volumes: number,
    published: JikanAiredObject,
    authors: Array<JikanPersonObject>
}

export interface JikanNew {
    mal_id: number,
    url: string,
    title: string,
    date: string,
    images: {jpg: JikanImageObject, webp: JikanImageObject},
    excerpt: string
}

export interface JikanCharacterCard {
    character: {
        mal_id: number,
        images: {jpg: JikanImageObject, webp: JikanImageObject},
        name: string
    },
    role: string
}

export interface JikanStaff {
    person: JikanPersonObject,
    positions: Array<string>
}

export interface JikanVoiceObject {
    person: JikanPersonObject,
    language: string
}

export interface JikanMediaCard {
    mal_id: number,
    title: string,
    images: JikanImageObject
}

export interface JikanCharacter {
    mal_id: number,
    images: {jpg: JikanImageObject, webp: JikanImageObject},
    name: string,
    name_kanji: string,
    nicknames: Array<string>,
    voices: Array<JikanVoiceObject>,
    anime: Array<JikanMediaCard>,
    manga: Array<JikanMediaCard>,
    about: string
}