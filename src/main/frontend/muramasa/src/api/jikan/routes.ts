import axios from "axios";

const jikan_url = "https://api.jikan.moe/v4/";

export default {
    getById: (animeId: string | number, type = "anime") => {
        return axios.get(jikan_url + `${type}/${animeId}/full`);
    },
    searchCharacters: (page = 1, limit = 24, query: string) => {
        return query.length === 0 ? 
            axios.get(jikan_url + `characters?page=${page}&limit=${limit}&order_by=favorites&sort=desc`) : 
            axios.get(jikan_url + `characters?page=${page}&limit=${limit}&q=${query}&order_by=favorites&sort=desc`)
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
    search: (page: number, limit: number, type = "anime", filters: any) => {
        let searchUrl = `${type}?page=${page}&limit=${limit}`;

        for(const filter of Object.keys(filters)) {
            searchUrl = searchUrl + `&${filter}=${filters[filter]}`;
        }
        return axios.get(jikan_url + searchUrl + '&order_by=popularity');
    },
    getSeason: (page = 1, limit = 24, season: string, year: string) => {
        return axios.get(jikan_url + `seasons/${year}/${season}?page=${page}&limit=${limit}`);
    },
    getSeasonNow: (page = 1, limit = 24) => {
        return axios.get(jikan_url + `seasons/now?page=${page}&limit=${limit}`);
    },
    getUpcomingSeason: (page = 1, limit = 24) => {
        return axios.get(jikan_url + `seasons/upcoming?page=${page}&limit=${limit}`);
    },
    getTrending: (limit: number, type = "anime") => {
        const media_type = type === "anime" ? "tv" : "manga";
        return axios.get(jikan_url + `${type}?order_by=popularity&limit=${limit}&type=${media_type}&status=complete&sort=asc`);
    },
    getTop: (type = "anime", limit: number, page = 1) => {
        return axios.get(jikan_url + `top/${type}?limit=${limit}&page=${page}`)
    },
    getAll: (page: number, type = "anime") => {
        return axios.get(jikan_url + `${type}?page=${page}`);
    }
}