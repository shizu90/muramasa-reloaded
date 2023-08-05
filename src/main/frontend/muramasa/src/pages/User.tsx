import { useState, useEffect } from "react";
import muramasa_api from "../api/muramasa/routes";
import Loading from "../components/icons/Loading";
import { LogData, UserData } from "../modules/userData";
import Log from "../components/Log";
import useAuth from "../hooks/useAuth";
import popupMessage from "../modules/toaster";

function followUser(toId: number, token: string, setAmIFollowing: Function) {
    muramasa_api.user.auth(token).followers().follow(toId)
    .then(() => {popupMessage.success("Followed user.");setAmIFollowing(true);})
    .catch(() => popupMessage.error("Cannot follow user."));
}

function unfollowUser(toId: number, token: string, setAmIFollowing: Function) {
    muramasa_api.user.auth(token).followers().unfollow(toId)
    .then(() => {popupMessage.success("Unfollowed user.");setAmIFollowing(false);})
    .catch(() => popupMessage.error("Cannot unfollow user."));
}

function User() {
    const auth = useAuth();
    const [user, setUser] = useState<UserData | null>(null);
    const [amIFollowing, setAmIFollowing] = useState<boolean>(false);
    const url: URLSearchParams = new URLSearchParams(window.location.search);
    const username: string = url.get("username") as unknown as string;
    
    useEffect(() => {
        muramasa_api.user.get(username)
        .then(res => {
            if(auth && auth.authObject) {
                muramasa_api.user.auth(auth.authObject.token).followers().followingCurrentUser(res.data.id)
                .then((res_follower) => {setAmIFollowing(res_follower.data);setUser(res.data);})
                .catch(() => popupMessage.error("Some error occurred."));
            }else setUser(res.data);
        })
    
    }, [])
    
    return (
        <main className="w-full flex justify-center items-center flex-col gap-8 text-slate-50 z-10 top-20 py-20">
            {user ? (
                <>
                    <header className="w-full relative h-auto">
                        <img className="w-full z-0 absolute h-80 object-cover" src={"https://images3.alphacoders.com/131/1318226.png"}/>
                        <div className="w-full absolute h-80 bg-gradient-to-t from-midnight to-transparent to-60%"></div>
                        <div className="w-full h-80"></div>
                        <div className="w-full bg-darkocean h-14 px-80 max-xl:px-40 flex items-center max-xl:justify-center z-10">
                            <img 
                                src={user.imgUrl.length > 0 ? user.imgUrl : "https://i.pinimg.com/236x/d0/05/0d/d0050d5c9f600d1cb362404d576aa199.jpg"}
                                className="w-40 h-60 object-cover rounded absolute top-[-20] shadow-lg shadow-midnight"/>
                            <div className="flex gap-4 ml-60 max-xl:ml-0 max-xl:absolute max-xl:bottom-[-60px] max-xl:w-full max-xl:gap-2 max-xl:justify-center max-xl:bg-darkocean p-2 rounded">
                                <span className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Home</span>
                                <span className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Anime list</span>
                                <span className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Manga list</span>
                                <span className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Followers</span>
                                <span className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Following</span>
                            </div>
                            <div className="absolute bottom-32 ml-44 max-xl:top-40 max-xl:ml-0">
                                <h2 className="font-medium text-2xl">{user.username}</h2>
                            </div>
                        </div>
                        <div className="px-80 max-xl:px-0 mt-4 w-full flex justify-between max-xl:mt-32 max-xl:justify-center max-xl:flex-col items-center gap-4">
                            <h5 className="text-sm ml-44 max-xl:ml-0">
                                <span className="font-medium">{user.followersCount}</span> followers 
                                - 
                                <span className="font-medium"> {user.followingCount}</span> following
                            </h5>
                            {
                                auth && auth.authObject?.username != username && 
                                <div className="">
                                    {!amIFollowing ? <button 
                                        className="bg-rose-500 px-4 py-2 rounded font-medium cursor-pointer text-sm" 
                                        onClick={() => followUser(user.id || 0, auth.authObject?.token || "", setAmIFollowing)}>
                                            Follow
                                    </button> : 
                                    <button 
                                        className="bg-rose-500 px-4 py-2 rounded font-medium cursor-pointer text-sm"
                                        onClick={() => unfollowUser(user.id || 0, auth.authObject?.token || "", setAmIFollowing)}>
                                            Unfollow
                                    </button>}
                                </div>
                            }
                        </div>
                    </header>
                    <main className="w-8/12 mt-10 flex max-xl:flex-col max-xl:w-full max-xl:justify-center items-center justify-between">
                        <div className="w-5/12 max-xl:w-full">
                            <div>
                                <h5 className="font-medium">Favorite animes</h5>
                                <div className="flex flex-wrap w-full gap-4 mt-4">
                                    {user.favoriteAnimes.map((anime: any) => (
                                        <a href={`/anime?id=${anime.code}`}>
                                            <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                                <img src={anime.imgUrl} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                                <h6 className="truncate text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{anime.name}</h6>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-medium">Favorite mangas</h5>
                                <div className="flex flex-wrap w-full gap-4 mt-4">
                                    {user.favoriteMangas.map((manga: any) => (
                                        <a href={`/manga?id=${manga.code}`}>
                                            <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                                <img src={manga.imgUrl} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                                <h6 className="truncate text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{manga.name}</h6>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-medium">Favorite characters</h5>
                                <div className="flex flex-wrap w-full gap-4 mt-4">
                                    {user.favoriteCharacters.map((character: any) => (
                                        <a href={`/character?id=${character.code}`}>
                                            <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                                <img src={character.img} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                                <h6 className="truncate text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{character.name}</h6>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-5/12 flex flex-col gap-4 max-xl:w-full">
                            <h5 className="font-medium">Recent activities</h5>
                            {
                                user.recentUpdates.map((log: LogData) => (
                                    <Log log={log}/>
                                ))
                            }
                        </div>
                    </main>
                </>
            ) : <Loading/>}
        </main>
    )
}

export default User;