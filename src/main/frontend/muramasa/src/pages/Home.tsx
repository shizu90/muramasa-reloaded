import {useEffect, useState} from 'react';
import jikan_api from "../api/jikan/routes";
import Loading from "../components/icons/Loading";
import Post from "../components/Post";
import muramasa_api from "../api/muramasa/routes";
import useAuth from '../hooks/useAuth';
import { MediaData } from '../modules/mediaData';
import { LogData } from '../modules/userData';
import Log from '../components/Log';

interface ProgressMedias {
    anime: Array<MediaData>,
    manga: Array<MediaData>
}

function Home() {
    const auth = useAuth();
    const [progressMedias, setProgressMedias] = useState<ProgressMedias>({anime: [], manga: []});
    const [recentDatas, setRecentDatas] = useState<Array<any>>([]);
    const [recentUpdates, setRecentUpdates] = useState<Array<LogData>>([]);

    useEffect(() => {
        if(auth.authObject) {
            muramasa_api.medialist.getitems(1, auth.authObject.animeListId, 0, 8)
            .then((anime_res) => {
                if(auth.authObject) muramasa_api.medialist.getitems(1, auth.authObject.mangaListId, 0, 8)
                .then((manga_res) => {
                    let obj: ProgressMedias = {anime: [], manga: []};
                    if(anime_res.data.content.length > 0 || manga_res.data.content.length > 0) {
                        if(anime_res.data.content.length > 0) {
                            obj['anime'] = anime_res.data.content;
                        }
                        if(manga_res.data.content.length > 0) {
                            obj['manga'] = manga_res.data.content;
                        }
                    }
                    setProgressMedias(obj);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
            muramasa_api.recentUpdates.auth(auth.authObject.token).following(auth.authObject.id)
            .then((res) => {setRecentUpdates(res.data);console.log(res.data)});
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            switch(recentDatas.length) {
                case 0:
                    jikan_api.getSeasonNow()
                    .then(res => res.data.data.sort((curr: any, next: any) => curr.popularity-next.popularity))
                    .then(res => setRecentDatas(res.slice(0, 6)));
                    break;
                case 6:
                    jikan_api.getTop("anime", 6).then(res => setRecentDatas([...recentDatas, ...res.data.data]));
                    break;
                case 12:
                    jikan_api.getTop("manga", 6).then(res => setRecentDatas([...recentDatas, ...res.data.data]));
                    break;
                default:
                    break;
            }
        }, 200);
    }, [recentDatas])

    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 justify-between flex flex-row max-sm:flex-col max-md:flex-col gap-12 text-slate-50 py-32">
            <section className="w-6/12 max-md:w-full">
                <h2 className="text-slate-50 font-medium text-lg mb-2">Your progress</h2>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between">
                            <h2 className="text-slate-300 font-bold text-sm">Anime</h2>
                            <span className="text-sm text-slate-500 cursor-pointer hover:underline transition-all">View all</span>
                        </div>
                        {progressMedias.anime.length > 0 ? <div className="grid grid-cols-4 gap-5 max-sm:grid-cols-3 max-md:grid-cols-5 max-lg:grid-cols-3">
                            {
                                progressMedias.anime.map((media: MediaData) => (
                                    <a href={`/anime?id=${media.code}`}>
                                        <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                            <img src={media.imgUrl} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                            <span className="truncate text-sm text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{media.name}</span>
                                            <h6 className="">Progress: {media.count} of {media.length}</h6>
                                        </div>
                                    </a>
                                ))
                            }
                        </div> : 
                            <div className="w-full text-center py-12">
                                <h6>Try watching some animes <a href="/search/anime?search=current" className="text-rose-500 underline">here</a></h6>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between">
                            <h2 className="text-slate-300 font-bold text-sm">Manga</h2>
                            <a href={`/user?username=${auth.authObject?.username}`} className="text-sm text-slate-500 cursor-pointer hover:underline transition-all">View all</a>
                        </div>
                        {progressMedias.manga.length > 0 ? <div className="grid grid-cols-4 gap-5 max-sm:grid-cols-3 max-md:grid-cols-5 max-lg:grid-cols-3">
                            {
                                progressMedias.manga.map((media: MediaData) => (
                                    <a href={`/anime?id=${media.code}`}>
                                        <div className="flex flex-col gap-1 text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                            <img src={media.imgUrl} className="w-[7rem] h-[10rem] object-cover rounded-md max-xl:w-[6rem] max-xl:h-[9rem]"/>
                                            <span className="truncate text-sm text-ellipsis font-medium w-[7rem] max-xl:w-[6rem]">{media.name}</span>
                                            <h6 className="">Progress: {media.count} of {media.length}</h6>
                                        </div>
                                    </a>
                                ))
                            }
                        </div> : 
                            <div className="w-full text-center py-12">
                                <h6>Try watching some animes <a href="/search/anime?search=current" className="text-rose-500 underline">here</a></h6>
                            </div>}
                    </div>
                </div>
                <h2 className="text-slate-50 font-medium text-lg mt-8">Updates from friends</h2>
                <ul className="flex flex-col gap-8">
                    {recentUpdates.length > 0 ? recentUpdates.map((log: LogData) => (
                        <Log log={log}/>
                    )) : <h5 className="text-sm text-slate-500 mt-2">Didn't found any recent updates.</h5>}
                </ul>
           </section>
           <section className="w-6/12 max-sm:w-full max-md:w-full max-lg:w-7/12">
                <h2 className="text-slate-50 font-medium text-lg mb-4">Current season</h2>
                <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
                    {
                        recentDatas ? recentDatas.slice(0, 6).map((anime) => (
                            <a href={`/anime?id=${anime.mal_id}`} className="w-26 h-38">
                            <div className="flex flex-col gap-1 w-full h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={anime.images.jpg.image_url} className="w-full h-full object-cover cursor-pointer rounded"/>
                            </div>
                            </a>
                        )) : <Loading/>}
                </div>
                <h2 className="text-slate-50 font-medium text-lg my-4">Top anime</h2>
                <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
                    {
                        recentDatas ? recentDatas.slice(6, 12).map((anime) => (
                            <a href={`/anime?id=${anime.mal_id}`} className="w-26 h-38">
                            <div className="flex flex-col gap-1 w-full h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={anime.images.jpg.image_url} className="w-full h-full object-cover cursor-pointer rounded"/>
                            </div>
                            </a>
                        )) : <Loading/>}
                </div>
                <h2 className="text-slate-50 font-medium text-lg my-4">Top manga</h2>
                <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
                    {
                        recentDatas ? recentDatas.slice(12).map((manga) => (
                            <a href={`/manga?id=${manga.mal_id}`} className="w-26 h-38">
                            <div className="flex flex-col gap-1 w-full h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={manga.images.jpg.image_url} className="w-full h-full object-cover cursor-pointer rounded"/>
                            </div>
                            </a>
                        )) : <Loading/>}
                </div>
                <h2 className="text-slate-50 font-medium text-lg my-4">Recent posts</h2>
                <div className="flex flex-col gap-4">
                    <Post/>
                    <Post/>
                </div>
           </section>
        </main>
    )
}

export default Home