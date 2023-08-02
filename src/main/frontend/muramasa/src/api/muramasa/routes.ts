import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const default_url = "http://localhost:8080/"

interface Response extends Promise<AxiosResponse<any, any>> {}

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
    length: number,
    status: number
}

interface ReviewData {
    id: number | null,
    text: string,
    score: number,
    code: number,
    reviewedAt: string
}

interface UserData {
    email: string,
    username: string,
    password: string,
    resume: string,
    imgUrl: string,
    bannerImgUrl: string
}

interface PostData {
    id: number | null,
    text: string,
    attach: string,
    likeCount: number,
    date: string
}

interface CharacterData {
    id: number | null,
    code: number,
    name: string,
    img: string
}

export default {
    user: {
        auth: (token: string) => {
            const config: AxiosRequestConfig = {headers: {Authorization: `Bearer ${token}`}};
            return {
                getInfo: (): Response => {
                    return axios.get(default_url + `users/info`, config);
                },
                update: (data: UserData): Response => {
                    return axios.put(default_url + `users`, data, config);
                },
                delete: (): Response => {
                    return axios.delete(default_url + `users`, config);
                },
                followers: () => {
                    return {
                        follow: (toId: number): Response => {
                            return axios.post(default_url + `follower/follow/${toId}`, null, config);
                        },
                        unfollow: (toId: number): Response => {
                            return axios.delete(default_url + `follower/unfollow/${toId}`, config);
                        },
                        followingCurrentUser: (toId: number): Response => {
                            return axios.get(default_url +  `follower/${toId}`, config);
                        }
                    }
                }
            }
        },
        follower: () => {
            return {
                getFollowers: (userId: number): Response => {
                    return axios.get(default_url + `follower/followers/${userId}`);
                },
                getFollowing: (userId: number): Response => {
                    return axios.get(default_url + `follower/following/${userId}`);
                }
            }
        },
        get: (username: string): Response => {
            return axios.get(default_url + `users/user/${username}`);
        },
        search: (username: string, offset: number): Response => {
            return axios.get(default_url + `users/${username}/${offset}`);
        },
        login: (data: LoginData): Response => {
            return axios.post(default_url + 'login', data);
        },
        register: (data: RegisterData): Response => {
            return axios.post(default_url + 'users', data);
        }
    },
    medialist: {
        getitems: (status: number, listId: number, offset: number, limit = 16): Response => {
            return axios.get(default_url + `list/items/${listId}/${status}/${offset}/${limit}`);
        }
    },
    media: {
        auth: (token: string) => {
            const config: AxiosRequestConfig = {headers: {Authorization: `Bearer ${token}`}};
            return {
                get: (code: number, listId: number): Response => {
                    return axios.get(default_url + `media/${code}/${listId}`, config);
                },
                add: (data: MediaData): Response => {
                    return axios.post(default_url + `media`, data, config);
                },
                update: (data: MediaData): Response => {
                    return axios.put(default_url + `media/${data.code}`, data, config);
                },
                delete: (data: MediaData): Response => {
                    return axios.delete(default_url + `media/${data.code}`, config);
                },
                reviews: () => {
                    return {
                        add: (mediaId: number, data: ReviewData): Response => {
                            return axios.post(default_url + `reviews/${mediaId}`, data, config);
                        },
                        update: (data: ReviewData): Response => {
                            return axios.put(default_url + `reviews`, data, config);
                        },
                        delete: (reviewId: number): Response => {
                            return axios.delete(default_url + `reviews/${reviewId}`, config);
                        },
                        getMediaReviews: (mediaCode: number, offset: number): Response => {
                            return axios.get(default_url + `reviews/media/${mediaCode}/${offset}`, config);
                        }
                    }
                }
            }
        }
    },
    recentUpdates: {
        auth: (token: string) => {
            const config: AxiosRequestConfig = {headers: {Authorization: `Bearer ${token}`}};
            return {
                following: (userId: number): Response => {
                    return axios.get(default_url + `recentupdates/following/${userId}`, config);
                }
            }
        }
    },
    posts: {
        auth: (token: string) => {
            const config: AxiosRequestConfig = {headers: {Authorization: `Bearer ${token}`}};
            return {
                create: (postData: PostData): Response => {
                    return axios.post(default_url + `posts`, postData, config);
                },
                reply: (replyPostData: PostData, parentPostId: number): Response => {
                    return axios.post(default_url + `posts/${parentPostId}`, replyPostData, config);
                },
                update: (postData: PostData, postId: number): Response => {
                    return axios.put(default_url + `posts/${postId}`, postData, config);
                },
                delete: (postId: number): Response => {
                    return axios.delete(default_url + `posts/${postId}`, config);
                },
                getFollowingPosts: (): Response => {
                    return axios.get(default_url + `posts/following`, config);
                },
                likePost: (postId: number): Response => {
                    return axios.post(default_url + `likes/like/${postId}`, null, config);
                },
                unlikePost: (postId: number): Response => {
                    return axios.delete(default_url + `likes/unlike/${postId}`, config);
                }
            }
        },
        getFullPost: (postId: number): Response => {
            return axios.get(default_url + `posts/full/${postId}`);
        },
        getUserPosts: (userId: number): Response => {
            return axios.get(default_url + `posts/${userId}`);
        }
    },
    character: {
        auth: (token: string) => {
            const config: AxiosRequestConfig = {headers: {Authorization: `Bearer ${token}`}};
            return {
                favorite: (characterData: CharacterData): Response => {
                    return axios.post(default_url + `character/favorite`, characterData, config);
                },
                unfavorite: (characterCode: number): Response => {
                    return axios.delete(default_url + `character/unfavorite/${characterCode}`, config);
                }
            }
        }
    }
}