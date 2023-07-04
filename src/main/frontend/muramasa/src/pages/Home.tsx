import Log from "../components/Log";
import {useEffect, useState} from 'react';
import jikan_api from "../api/jikan/routes";
import Loading from "../components/Loading";

function Home() {
    const [recentDatas, setRecentDatas] = useState<Array<any>>([]);

    useEffect(() => {
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
    }, [recentDatas])

    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 justify-between flex flex-row max-sm:flex-col max-md:flex-col gap-12 text-slate-50">
            <section>
                <h2 className="text-slate-50 font-medium text-lg mb-2">Your progress</h2>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between">
                            <h2 className="text-slate-300 font-bold text-sm">Anime</h2>
                            <span className="text-sm text-slate-500 cursor-pointer hover:underline transition-all">View all</span>
                        </div>
                        <div className="grid grid-cols-4 gap-5 max-sm:grid-cols-3 max-md:grid-cols-5 max-lg:grid-cols-3">
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between">
                            <h2 className="text-slate-300 font-bold text-sm">Manga</h2>
                            <span className="text-sm text-slate-500 cursor-pointer hover:underline transition-all">View all</span>
                        </div>
                        <div className="grid grid-cols-4 gap-5 max-sm:grid-cols-3 max-md:grid-cols-5 max-lg:grid-cols-3">
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                            <div className="h-[8rem] w-[6rem] bg-slate-800 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>
                <h2 className="text-slate-50 font-bold text-lg mb-4 mt-4">Updates from friends</h2>
                <ul className="flex flex-col gap-8">
                    <li><Log/></li>
                    <li><Log/></li>
                    <li><Log/></li>
                    <li><Log/></li>
                    <li><Log/></li>
                </ul>
           </section>
           <section className="w-6/12 max-sm:w-full max-md:w-full max-lg:w-7/12">
                <h2 className="text-slate-50 font-medium text-lg mb-4">Current season</h2>
                <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
                    {
                        recentDatas ? recentDatas.slice(0, 6).map((anime) => (
                            <a href={`/anime?id=${anime.mal_id}`} className="w-26">
                            <div className="flex flex-col gap-1 w-full h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={anime.images.jpg.image_url} className="w-full h-full cursor-pointer rounded"/>
                            </div>
                            </a>
                        )) : <Loading/>}
                </div>
                <h2 className="text-slate-50 font-medium text-lg my-4">Top anime</h2>
                <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
                    {
                        recentDatas ? recentDatas.slice(6, 12).map((anime) => (
                            <a href={`/anime?id=${anime.mal_id}`} className="w-26">
                            <div className="flex flex-col gap-1 w-full h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={anime.images.jpg.image_url} className="w-full h-full cursor-pointer rounded"/>
                            </div>
                            </a>
                        )) : <Loading/>}
                </div>
                <h2 className="text-slate-50 font-medium text-lg my-4">Top manga</h2>
                <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
                    {
                        recentDatas ? recentDatas.slice(12).map((manga) => (
                            <a href={`/manga?id=${manga.mal_id}`} className="w-26">
                            <div className="flex flex-col gap-1 w-full h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={manga.images.jpg.image_url} className="w-full h-full cursor-pointer rounded"/>
                            </div>
                            </a>
                        )) : <Loading/>}
                </div>
           </section>
        </main>
    )
}

export default Home