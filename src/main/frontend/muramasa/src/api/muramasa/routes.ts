import axios from "axios";

const default_url = "http://localhost:8080/"

interface RegisterData {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface LoginData {
    username: string,
    password: string
}

interface MediaData {
    id: number | null,
    code: number,
    name: string,
    imgUrl: string,
    type: string,
    favorited: 0 | 1, 
    count: number,
    cLength: number,
    status: number
}

export default {
    user: {
        get: (username: string) => {
            return axios.get(default_url + `users/user/${username}`);
        },
        search: (username: string, offset: number) => {
            return axios.get(default_url + `users/${username}/${offset}`);
        },
        getInfo: (id: number) => {
            return axios.get(default_url + `users/info/${id}`);
        },
        login: (data: LoginData) => {
            return axios.post(default_url + 'login', data);
        },
        register: (data: RegisterData) => {
            return axios.post(default_url + 'users', data);
        },
        update: (data: any, id: number) => {
            return axios.put(default_url + `users/${id}`, data);
        },
        delete: (id: number) => {
            return axios.delete(default_url + `users/${id}`);
        },
        follow: (fromId: number, toId: number) => {
            return axios.post(default_url + `follower/follow/${fromId}/${toId}`);
        },
        unfollow: (fromId: number, toId: number) => {
            return axios.delete(default_url + `follower/unfollow/${fromId}/${toId}`);
        },
        getFollowing: (userId: number) => {
            return axios.get(default_url + `follower/following/${userId}`);
        },
        getFollowers: (userId: number) => {
            return axios.get(default_url + `follower/followers/${userId}`);
        }
    },
    medialist: {
        getitems: (status: number, listId: number, offset: number, limit = 16) => {
            return axios.get(default_url + `list/items/${listId}/${status}/${offset}/${limit}`);
        }
    },
    media: {
        auth: (token: string) => {
            const config = {headers: {Authorization: `Bearer ${token}`}}
            return {
                get: (code: number, listId: number) => {
                    return axios.get(default_url + `media/${code}/${listId}`, config);
                },
                add: (data: MediaData) => {
                    return axios.post(default_url + `media`, data, config);
                },
                update: (data: MediaData) => {
                    return axios.put(default_url + `media/${data.code}`, data, config);
                },
                delete: (data: MediaData) => {
                    return axios.delete(default_url + `media/${data.code}`, config);
                }
            }
        }
    },
    recentUpdates: {
        auth: (token: string) => {
            let config = {headers: {Authorization: `Bearer ${token}`}};
            return {
                following: (userId: number) => {
                    return axios.get(default_url + `recentupdates/following/${userId}`, config);
                }
            }
        }
    }
}