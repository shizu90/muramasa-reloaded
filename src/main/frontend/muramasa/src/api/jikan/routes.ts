import axios from "axios";

const jikan_url = "https://api.jikan.moe/v4/";

export default {
    getById: (animeId: string | number, type = "anime") => {
        return axios.get(jikan_url + `${type}/${animeId}/full`);
    },
    getCharacters: (animeId: string | number, type = "anime") => {
        return axios.get(jikan_url + `${type}/${animeId}/characters`);
    },
    getCharacterById: (id: number | string) => {
        return axios.get(jikan_url + `characters/${id}/full`);
    },
    getStaff: (id: number | string, type = "anime") => {
        return axios.get(jikan_url + `${type}/${id}/staff`);
    },
    getNews: (animeId: string | number, type = "anime") => {
        return axios.get(jikan_url + `${type}/${animeId}/news`);
    },
    search: (page: number, limit: number, query: string, type = "anime", media_type = "tv", min_score = 0, max_score = 10.0, status = "complete") => {
        const default_orderby = "popularity";
        if(type === "manga" && !["manga", "novel", "lightnovel", "manhwa", "manhua", "doujin", "oneshot"].includes(media_type)) {
            media_type = "manga";
        }
        return axios.get(jikan_url + 
            `${type}?q=${query}&page=${page}&limit=${limit}&type=${type}&min_score=${min_score}&max_score=${max_score}&status=${status}&order_by=${default_orderby}`);
    },
    getSeasonNow: () => {
        return axios.get(jikan_url + `seasons/now`);
    },
    getUpcomingSeason: () => {
        return axios.get(jikan_url + 'seasons/upcoming');
    },
    getTrending: (limit: number, type = "anime") => {
        const media_type = type === "anime" ? "tv" : "manga";
        return axios.get(jikan_url + `${type}?order_by=popularity&limit=${limit}&type=${media_type}&status=complete&sort=asc`);
    },
    getTop: (type = "anime", limit: number) => {
        return axios.get(jikan_url + `top/${type}?limit=${limit}`)
    },
    getAll: (page: number, type = "anime") => {
        return axios.get(jikan_url + `${type}?page=${page}`);
    }
}