import { useState, useEffect } from "react";
import muramasa_api from "../api/muramasa/routes";
import Loading from "../components/icons/Loading";
import { LogData, UserData } from "../modules/userData";
import Log from "../components/Log";
import useAuth from "../hooks/useAuth";
import popupMessage from "../modules/toaster";
import { MediaData } from "../modules/mediaData";
import { generatePages } from "../modules/pagination";
import UserCard from "../components/UserCard";

function getStatus(status: number) {
    switch(status) {
        case 1:
            return ["Watching", "Reading"];
        case 2:
            return ["Completed"];
        case 3:
            return ["Plans to watch", "Plans to read"];
        case 4:
            return ["Dropped"];
        case 5:
            return ["On hold"];
        default:
            return [];
    }
}

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

interface ControlData {
    listControl: {type: "anime" | "manga",
    page: number,
    status: number},
    followControl: {
        page: number
    }
}

interface ListData {
    data: Array<MediaData>
    totalPages: number
}

interface FollowData {
    data: Array<any>,
    totalPages: number
}

function User() {
    const auth = useAuth();
    const url: URLSearchParams = new URLSearchParams(window.location.search);
    const username: string = url.get("username") as unknown as string;
    const pageParam: string = url.get("page") as unknown as string;
    const statusParam: string = url.get("status") as unknown as string;
    const [user, setUser] = useState<UserData | null>(null);
    const [amIFollowing, setAmIFollowing] = useState<boolean>(false);
    const [page, setPage] = useState<string>(pageParam ? pageParam : "home");
    const [controlData, setControlData] = useState<ControlData>({listControl: {type: "anime", page: 0, status: statusParam ? parseInt(statusParam) : 1}, followControl: {page: 0}});
    const [listData, setListData] = useState<ListData>({data: [], totalPages: 0});
    const [followData, setFollowData] = useState<FollowData>({data: [], totalPages: 0});
    
    useEffect(() => {
        muramasa_api.user.get(username)
        .then(res => {
            if(auth && auth.authObject) {
                muramasa_api.user.auth(auth.authObject.token).followers().followingCurrentUser(res.data.id)
                .then((res_follower) => {setAmIFollowing(res_follower.data);setUser(res.data)})
                .catch(() => popupMessage.error("Some error occurred."));
            }else setUser(res.data);
        })
    
    }, [])

    useEffect(() => {
        if(user) {
            if(page === 'animeList') {
                muramasa_api.medialist.getitems(controlData.listControl.status === 0 ? 1 : controlData.listControl.status, user.animeListId, controlData.listControl.page, 16)
                .then((res) => {
                    setListData({data: res.data.content, totalPages: res.data.totalPages});
                });
            }else if(page === 'mangaList') {
                muramasa_api.medialist.getitems(controlData.listControl.status === 0 ? 1 : controlData.listControl.status, user.mangaListId, controlData.listControl.page, 16)
                .then((res) => {
                    setListData({data: res.data.content, totalPages: res.data.totalPages});
                });
            }else if(page === 'following') {
                muramasa_api.user.follower().getFollowing(user.id, 0)
                .then((res) => {setFollowData({data: res.data.content, totalPages: res.data.totalPages});console.log(res.data)});
            }else if(page === 'followers') {
                muramasa_api.user.follower().getFollowers(user.id, 0)
                .then((res) => {setFollowData({data: res.data.content, totalPages: res.data.totalPages});console.log(res.data)});
            }
        }
    }, [page, controlData]);
    
    return (
        <main className="w-full flex justify-center items-center flex-col gap-8 text-slate-50 z-10 top-20 py-20 max-xl:px-1">
            {user ? (
                <>
                    <header className="w-full relative h-auto mb-6">
                        <img className="w-full z-0 absolute h-80 object-cover" src={"https://cdna.artstation.com/p/assets/images/images/040/665/994/large/andrew-maleski-ghostly-gate.jpg?1629536251"}/>
                        <div className="w-full absolute h-80 bg-gradient-to-t from-midnight to-transparent to-60%"></div>
                        <div className="w-full h-80"></div>
                        <div className="w-full bg-darkocean h-14 px-80 max-xl:px-0 flex items-center max-xl:justify-center z-10">
                            <img 
                                src={user.imgUrl.length > 0 ? user.imgUrl : "https://i.pinimg.com/236x/d0/05/0d/d0050d5c9f600d1cb362404d576aa199.jpg"}
                                className="w-40 h-60 object-cover rounded absolute top-[-20] shadow-lg shadow-midnight"/>
                            <div className="flex gap-4 ml-60 max-xl:ml-0 max-xl:absolute max-xl:bottom-[-60px] max-xl:w-full max-xl:gap-2 max-xl:flex-wrap max-xl:justify-center p-2 max-xl:bg-darkocean rounded">
                                <span onClick={() => setPage('home')} className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Home</span>
                                <span onClick={() => setPage('animeList')} className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Anime list</span>
                                <span onClick={() => setPage('mangaList')} className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Manga list</span>
                                <span onClick={() => setPage('followers')} className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Followers</span>
                                <span onClick={() => setPage('following')} className="cursor-pointer hover:text-rose-500 text-slate-50 transition-all text-sm max-xl:text-[12px] font-medium">Following</span>
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
                                auth.authObject && auth.authObject.username != username && 
                                <div className="ml-44">
                                    {!amIFollowing ? <button 
                                        className="bg-rose-500 px-4 py-2 rounded font-medium cursor-pointer text-sm" 
                                        onClick={() => followUser(user.id || 0, auth.authObject?.token || "", setAmIFollowing)}>
                                            Follow
                                    </button> : 
                                    <button 
                                        className="bg-transparent border-rose-500 border px-4 py-2 rounded font-medium cursor-pointer text-sm"
                                        onClick={() => unfollowUser(user.id || 0, auth.authObject?.token || "", setAmIFollowing)}>
                                            Unfollow
                                    </button>}
                                </div>
                            }
                        </div>
                    </header>
                    {page === 'home' ? <main className="w-full px-80 max-xl:px-0 mt-10 flex max-xl:flex-col max-xl:w-full max-xl:justify-center max-xl:items-center gap-12">
                        <div className="w-5/12 max-xl:w-full">
                            <div>
                                <h5 className="font-medium">Overview</h5>
                                <div className="p-4 text-sm bg-darkocean rounded mt-4 flex gap-4 flex-wrap justify-center">
                                    <div>
                                        <h6 className="font-medium mb-2">Total animes</h6>
                                        <span className="bg-midnight px-6 py-1 rounded">{user.animeListCount}</span>
                                    </div>
                                    <div>
                                        <h6 className="font-medium mb-2">Total mangas</h6>
                                        <span className="bg-midnight px-6 py-1 rounded">{user.mangaListCount}</span>
                                    </div>
                                    <div>
                                        <h6 className="font-medium mb-2">Joined date</h6>
                                        <span className="bg-midnight px-6 py-1 rounded">{user.createdAt.split(" ")[0]}</span>
                                    </div>
                                </div>
                            </div>
                            {user.resume.length == 0 && <div className="my-4">
                                <h5 className="font-medium">Biography</h5>
                                <div className="p-4 text-sm bg-darkocean rounded mt-4">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </div>
                            </div>}
                            <div>
                                <h5 className="font-medium">Favorite animes</h5>
                                <div className="flex flex-wrap w-full gap-4 mt-4">
                                    {user.favoriteAnimes.length > 0 ? user.favoriteAnimes.map((anime: any) => (
                                        <a href={`/anime?id=${anime.code}`}>
                                            <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                                <img src={anime.imgUrl} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                                <h6 className="truncate text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{anime.name}</h6>
                                            </div>
                                        </a>
                                    )) : <span className="text-slate-500 text-sm ">{user.username} haven't favorited anything yet.</span>}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-medium">Favorite mangas</h5>
                                <div className="flex flex-wrap w-full gap-4 mt-4">
                                    {user.favoriteMangas.length > 0 ? user.favoriteMangas.map((manga: any) => (
                                        <a href={`/manga?id=${manga.code}`}>
                                            <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                                <img src={manga.imgUrl} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                                <h6 className="truncate text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{manga.name}</h6>
                                            </div>
                                        </a>
                                    )) : <span className="text-slate-500 text-sm ">{user.username} haven't favorited anything yet.</span>}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-medium">Favorite characters</h5>
                                <div className="flex flex-wrap w-full gap-4 mt-4">
                                    {user.favoriteCharacters.length > 0 ? user.favoriteCharacters.map((character: any) => (
                                        <a href={`/character?id=${character.code}`}>
                                            <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                                <img src={character.img} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                                <h6 className="truncate text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{character.name}</h6>
                                            </div>
                                        </a>
                                    )) : <span className="text-slate-500 text-sm ">{user.username} haven't favorited anything yet.</span>}
                                </div>
                            </div>
                        </div>
                        <div className="w-5/12 flex flex-col gap-4 max-xl:w-full">
                            <h5 className="font-medium">Recent activities</h5>
                            {
                                user.recentUpdates.length > 0 ? user.recentUpdates.map((log: LogData) => (
                                    <Log log={log}/>
                                )) : <span className="text-slate-500 text-sm ">{user.username} don't have any activities recently.</span>
                            }
                        </div>
                    </main> : page === 'animeList' ? 
                    <main className="w-full px-80 max-xl:px-0 mt-10 flex max-xl:flex-col max-xl:w-full max-xl:justify-center max-xl:items-center gap-12">
                        <div className="flex flex-col gap-2 mt-4 text-sm w-3/12 max-xl:w-full">
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 1}})}>Watching</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 2}})}>Completed</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 3}})}>Plans to watch</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 4}})}>Dropped</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 5}})}>On hold</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-medium">{getStatus(controlData.listControl.status)[0]}</h4>
                            <div className="flex flex-wrap gap-4 w-full max-xl:w-full">
                                {listData.data.length > 0 ? listData.data.map((item: MediaData) => (
                                    <a href={`/anime?id=${item.code}`} key={item.id}>
                                        <div className="flex flex-col gap-1 w-40 h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                            <img src={item.imgUrl} className="w-full h-56 max-sm:h-36 object-cover cursor-pointer rounded"/>
                                            <span className="truncate text-ellipsis text-sm font-medium">{item.name}</span>
                                            <span className="text-slate-500 text-sm">Scored {item.score} of 10</span>
                                        </div>
                                    </a>
                                )) : <span className="text-slate-500 text-sm ">{user.username} haven't added nothing here.</span>}
                            </div>
                            <div className="flex gap-1">
                                {generatePages(controlData.listControl.page+1, listData.totalPages).map((pageNumber: number) => (
                                    <span 
                                        key={pageNumber} 
                                        className={((controlData.listControl.page+1) === pageNumber ? "text-rose-500" : "text-slate-50") + " text-sm px-2 py-1 rounded bg-darkocean cursor-pointer"} 
                                        onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, page: pageNumber-1}})}>{pageNumber}</span>
                                ))}
                            </div>
                        </div>
                    </main>
                    : page === 'mangaList' ? 
                    <main className="w-full px-80 max-xl:px-0 mt-10 flex max-xl:flex-col max-xl:w-full max-xl:justify-center max-xl:items-center gap-12">
                        <div className="flex flex-col gap-2 mt-4 text-sm w-3/12 max-xl:w-full">
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 1}})}>Reading</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 2}})}>Completed</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 3}})}>Plans to read</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 4}})}>Dropped</span>
                            <span className="bg-darkocean px-4 py-2 rounded cursor-pointer hover:bg-slate-800 transition-all" onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, status: 5}})}>On hold</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-medium">{getStatus(controlData.listControl.status)[1] || getStatus(controlData.listControl.status)[0]}</h4>
                            <div className="flex flex-wrap gap-4 w-full max-xl:w-full">
                                {listData.data.length > 0 ? listData.data.map((item: MediaData) => (
                                    <a href={`/manga?id=${item.code}`} key={item.id}>
                                        <div className="flex flex-col gap-1 w-40 h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                            <img src={item.imgUrl} className="w-full h-56 max-sm:h-36 object-cover cursor-pointer rounded"/>
                                            <span className="truncate text-ellipsis text-sm font-medium">{item.name}</span>
                                            <div className="flex flex-col w-full justify-between text-sm">
                                                <span className="text-slate-500 text-sm">Scored {item.score} of 10</span>
                                                {item.review ? (
                                                    <span className="text-slate-500 underline hover:text-slate-500">Check Review</span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </a>
                                )) : <span className="text-slate-500 text-sm">{user.username} haven't added nothing here.</span>}
                            </div>
                            <div className="flex gap-1">
                                {generatePages(controlData.listControl.page+1, listData.totalPages).map((pageNumber: number) => (
                                    <span 
                                        key={pageNumber} 
                                        className={((controlData.listControl.page+1) === pageNumber ? "text-rose-500" : "text-slate-50") + " text-sm px-2 py-1 rounded bg-darkocean cursor-pointer"} 
                                        onClick={() => setControlData({...controlData, listControl: {...controlData.listControl, page: pageNumber-1}})}>{pageNumber}</span>
                                ))}
                            </div>
                        </div>
                    </main>
                    : page === 'followers' ?
                    <main className="w-full px-80 max-xl:px-0 mt-10 flex max-xl:flex-col max-xl:w-full max-xl:justify-center max-xl:items-center gap-12">
                        <div className="flex flex-col gap-4">
                            <h5 className="font-medium">Users following {user.username}</h5>
                            <div className="flex flex-wrap gap-4 w-full max-xl:w-full">
                                {
                                    followData.data.length > 0 ? followData.data.map((follow: any) => (
                                        <UserCard user={follow.from}/>
                                    )) :
                                    <h5 className="text-slate-500 italic">{user.username} don't have any followers.</h5>
                                } 
                            </div>
                        </div>
                    </main>
                    : page === 'following' ? 
                    <main className="w-full px-80 max-xl:px-0 mt-10 flex max-xl:flex-col max-xl:w-full max-xl:justify-center max-xl:items-center gap-12">
                        <div className="flex flex-col gap-4">
                            <h5 className="font-medium">Users followed by {user.username}</h5>
                            <div className="flex flex-wrap gap-4 w-full max-xl:w-full">
                                {
                                    followData.data.length > 0 ? followData.data.map((follow: any) => (
                                        <UserCard user={follow.to}/>
                                    )):
                                    <h5 className="text-slate-500 italic">{user.username} not following anyone.</h5>
                                }
                            </div>
                        </div>
                    </main>
                    : null
                }
                </>
            ) : <Loading/>}
        </main>
    )
}

export default User;