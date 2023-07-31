export interface MediaData {
    id: number | null,
    code: number,
    name: string,
    imgUrl: string,
    type: string,
    favorited: 0 | 1, 
    count: number,
    cLength: number,
    status: number,
    score: number
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
    name: string
}

export interface JikanAnime {
    mal_id: number,
    url: string,
    images: {jpg: JikanImageObject, webp: JikanImageObject},
    title: string,
    title_english: string,
    title_japanese: string,
    type: string,
    source: string,
    episodes: number,
    status: string,
    aired: JikanAiredObject,
    duration: string,
    score: number,
    rank: number,
    popularity: number,
    favorites: number,
    synopsis: string,
    season: string,
    year: number,
    genres: Array<JikanGenreObject>,
    studios: Array<JikanStudioObject>,
    news: Array<JikanNew> | null,
    characters: Array<JikanCharacterCard> | null,
    staff: Array<JikanStaff> | null
}

export interface JikanManga {
    mal_id: number,
    url: string,
    images: {jpg: JikanImageObject, webp: JikanImageObject},
    title: string,
    title_english: string,
    title_japanese: string,
    type: string,
    chapters: number,
    volumes: number,
    status: string,
    published: JikanAiredObject,
    duration: string,
    score: number,
    rank: number,
    popularity: number,
    favorites: number,
    synopsis: string,
    year: number,
    genres: Array<JikanGenreObject>,
    authors: Array<JikanPersonObject>,
    news: Array<JikanNew> | null,
    characters: Array<JikanCharacterCard> | null,
    page: string
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