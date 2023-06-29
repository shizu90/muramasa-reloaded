import Log from "../components/Log";
import {useEffect, useState} from 'react';
import jikan from "../api/jikan/routes";
import Loading from "../components/Loading";

function Home() {
    const [currentSeason, setCurrentSeason] = useState<Array<any>>();

    useEffect(() => {
        jikan.getSeasonNow().then((data) => {
            let arr = Array.from(data.data.data).sort((curr: any, next: any) => curr.popularity-next.popularity);
            setCurrentSeason(arr);
        });
    }, [currentSeason])

    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 justify-between flex flex-row max-sm:flex-col max-md:flex-col gap-12 text-slate-50">
            <section>
                <h2 className="text-slate-50 font-bold text-lg mb-2">Your progress</h2>
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
                <h2 className="text-slate-50 font-bold text-lg mb-4">Current season</h2>
                <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-3">
                    {
                        currentSeason ? currentSeason.map((anime) => (
                            <>
                            <div className="flex flex-col gap-1 w-32 h-42 text-slate-300 hover:text-rose-500 transition-all max-sm:w-20">
                                <img src={anime.images.jpg.image_url} className="w-full h-full cursor-pointer rounded"/>
                                <span className="w-full truncate text-ellipsis text-sm font-medium max-sm:text-[12px]">{anime.title}</span>
                            </div>
                            </>
                        )) : <Loading/>}
                </div>
           </section>
        </main>
    )
}

export default Home