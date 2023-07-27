import { useEffect, useState } from "react"
import jikan from "../api/jikan/routes"

function Front() {
    const [items, setItems] = useState<Array<any>>([]);

    useEffect(() => {
        if(items.length < 18) {
            setTimeout(() => {
                switch(items.length) {
                    case 0:
                        jikan.getSeasonNow().then(data => {
                            let arr = Array.from(data.data.data).sort((curr:any, next:any) => curr.popularity-next.popularity).slice(0, 6);
                            setItems([...items, ...arr]);
                        });
                        break;
                    case 6:
                        jikan.getUpcomingSeason().then(data => {
                            let arr = Array.from(data.data.data).sort((curr:any, next:any) => curr.popularity-next.popularity).slice(0, 6);
                            setItems([...items, ...arr])
                        });
                        break;
                    case 12:
                        jikan.getTop("anime", 6).then(data => {
                            setItems([...items, ...data.data.data])
                        });
                        break;
                    default:
                        break;
                }
            }, 200);
        }
    }, [items]);

    return (
        <>
        <div className="absolute w-full h-[32rem] top-20 bg-wallpaper z-0 bg-no-repeat bg-cover"></div>
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            <section className="w-full h-[22rem] max-sm:h-auto flex flex-col justify-center items-center">
                <div className="flex flex-row max-sm:flex-col gap-4 text-center text-slate-300">
                    <div className="flex justify-center items-center gap-4 bg-midnight p-6 py-8 rounded-xl w-8/12 max-sm:w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[4rem] h-[4rem]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <h2 className="text-md font-medium">Discover any animes, mangas or manhwas. Get updated on the current and upcoming anime seasons.</h2>
                    </div>
                    <div className="flex justify-center items-center gap-4 bg-midnight p-6 py-8 rounded-xl w-8/12 max-sm:w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[4rem] h-[4rem]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <h2 className="text-md font-medium">Connect and share activities with your friends. See what they are watching or reading.</h2>
                    </div>
                    <div className="flex justify-center items-center gap-4 bg-midnight p-6 py-8 rounded-xl w-8/12 max-sm:w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[4rem] h-[4rem]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                        <h2 className="text-md font-medium">Save your progress, statuses and your favorites. Customize your profile and more.</h2>
                    </div>
                </div>
                <a className="font-medium px-[5rem] py-2 mt-8 bg-rose-500 rounded-lg text-xl cursor-pointer transition-all shadow-2xl hover:shadow-rose-500 focus:shadow-rose-500" href="/signup">Join Now</a>
            </section>
            
            <div className="flex gap-8 flex-col justify-center">
                <section className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full flex items-center justify-between text-xl max-sm:text-sm">
                        <h1 className="font-medium">Current season</h1>
                        <a href="/search/anime?search=current" className="cursor-pointer text-sm p-2 bg-transparent hover:bg-rose-500 transform hover:translate-x-2 focus:translate-x-2 focus:bg-rose-500 rounded transition-all" tabIndex={0}>View more</a>
                    </div>
                    <div className="flex gap-4 justify-center flex-shrink flex-wrap">
                        {
                            items.length > 0 ? items.slice(0, 6).map(anime => (
                                <a href={`/anime?id=${anime.mal_id}`} key={anime.mal_id}>
                                <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] max-lg:h-[9rem] max-lg:w-[6rem] relative">
                                    <img className="h-full w-full rounded cursor-pointer" src={anime.images.jpg.image_url} draggable={false}/>
                                    <div tabIndex={0} className="h-full w-full text-slate-50 bg-slate-900 rounded absolute left-0 top-0 bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity">
                                        <span className="font-medium text-ellipsis whitespace-nowrap overflow-hidden w-10/12 max-sm:text-sm">{anime.title}</span>
                                        <span className="text-sm">{anime.status}</span>
                                    </div>
                                </div>
                                </a>
                            )) : Array(6).fill(0).map((_, idx) => (
                            <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] max-lg:h-[9rem] max-lg:w-[6rem] animate-pulse bg-slate-800 rounded" key={idx+5}>
                            </div>))
                        }
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full flex items-center justify-between text-xl max-sm:text-sm">
                        <h1 className="font-medium">Upcoming season</h1>
                        <a href="/search/anime?search=upcoming" className="cursor-pointer text-sm p-2 bg-transparent hover:bg-rose-500 focus:translate-x-2 focus:bg-rose-500 transform hover:translate-x-2 rounded transition-all" tabIndex={0}>View more</a>
                    </div>
                    <div className="flex gap-4 justify-center flex-shrink flex-wrap">
                        {
                            items.length > 12 ? items.slice(6, 12).map(anime => (
                                <a href={`/anime?id=${anime.mal_id}`} key={anime.mal_id}>
                                <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] max-lg:h-[9rem] max-lg:w-[6rem] relative">
                                    <img className="h-full w-full rounded cursor-pointer" src={anime.images.jpg.image_url} draggable={false}/>
                                    <div tabIndex={0} className="h-full w-full text-slate-50 bg-slate-900 rounded absolute left-0 top-0 bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity">
                                        <span className="font-medium text-ellipsis whitespace-nowrap overflow-hidden w-10/12 max-sm:text-sm">{anime.title}</span>
                                        <span className="text-sm">{anime.status}</span>
                                    </div>
                                </div>
                                </a>
                            )) : Array(6).fill(0).map((_, idx) => (
                            <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] max-lg:h-[9rem] max-lg:w-[6rem] animate-pulse bg-slate-800 rounded" key={idx+10}>
                            </div>))
                        }
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full flex items-center justify-between text-xl max-sm:text-sm">
                        <h1 className="font-medium">Top anime</h1>
                        <a href="/search/anime?search=top" className="cursor-pointer text-sm p-2 bg-transparent hover:bg-rose-500 focus:translate-x-2 focus:bg-rose-500 transform hover:translate-x-2 rounded transition-all" tabIndex={0}>View more</a>
                    </div>
                    <div className="flex gap-4 justify-center flex-shrink flex-wrap">
                        {
                            items.length === 18
                            ? items.slice(12).map(anime => (
                                <a href={`/anime?id=${anime.mal_id}`} key={anime.mal_id}>
                                <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] max-lg:h-[9rem] max-lg:w-[6rem] relative">
                                    <img className="h-full w-full rounded cursor-pointer" src={anime.images.jpg.image_url} draggable={false}/>
                                    <div tabIndex={0} className="h-full w-full text-slate-50 bg-slate-900 rounded absolute left-0 top-0 bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity">
                                        <span className="font-medium text-ellipsis whitespace-nowrap overflow-hidden w-10/12 max-sm:text-sm">{anime.title}</span>
                                        <span >{anime.rank}º</span>
                                    </div>
                                </div>
                                </a>
                            )) : Array(6).fill(0).map((_, idx) => (
                            <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] max-lg:h-[9rem] max-lg:w-[6rem] animate-pulse bg-slate-800 rounded" key={idx+20}>
                            </div>))
                        }
                    </div>
                </section>
            </div>
        </main>
        </>
    )
}

export default Front