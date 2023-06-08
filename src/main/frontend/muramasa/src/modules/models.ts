interface Log {
    id: number,
    date: string,
    message: string
}

interface User {
    id: number,
    username: string,
    resume: string,
    imgUrl: string,
    bannerImgUrl: string,
    animeListCount: number,
    mangaListCount: number,
    animeListId: number,
    mangaListId: number,
    followersCount: number,
    followingCount: number
    recentUpdates: Array<Log>
}

interface Media {
    id: number,
    code: number,
    name: string,
    imgUrl: string,
    type: string,
    favorited: number,
    count: number,
    cLength: number,
    status: number
}