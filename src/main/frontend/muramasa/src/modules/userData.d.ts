export interface PostData {
    
}

export interface LogData {
    id: number,
    date: string,
    message: string,
    userImg: string
}

export interface UserData {
    id: number,
    username: string,
    resume: string,
    animeListId: number,
    mangaListId: number,
    imgUrl: string,
    bannerImgUrl: string,
    favoriteAnimes: Array
    favoriteCharacters: Array
    favoriteMangas: Array
    followersCount: number,
    followingCount: number,
    animeListCount: number,
    mangaListCount: number,
    posts: Array
    recentUpdates: Array
}