import { useEffect, useState } from "react"
import jikan from "../api/jikan/routes"
import useDebounce from "../hooks/useDebounce";

function Home() {
    const [items, setItems] = useState<Array<any>>([]);
    const [text, setText] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Array<any>>([]);
    
    const debouncedChange = useDebounce((value: string) => setText(value), 1000);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedChange(event.target.value)
    }

    useEffect(() => {
        if(items.length < 18) {
            if(items.length === 0) jikan.getSeasonNow().then(data => {
                let arr = Array.from(data.data.data).sort((curr:any, next:any) => curr.popularity-next.popularity).slice(0, 6);
                console.log(arr)
                setItems([...items, ...arr]);
            });
            if(items.length === 6) jikan.getUpcomingSeason().then(data => {
                let arr = Array.from(data.data.data).sort((curr:any, next:any) => curr.popularity-next.popularity).slice(0, 6);
                setItems([...items, ...arr])
            });
            if(items.length === 12) jikan.getTop("anime", 6).then(data => {
                console.log(data.data.data)
                setItems([...items, ...data.data.data])
            });
        }else if(text.length > 0) {
            jikan.search(0, 4, text).then(data => setSearchResult([...data.data.data]));
            setText('');
        }else setSearchResult([]);
    }, [items, text]);

    return (
        <>
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 items-center justify-center flex flex-col gap-8 text-slate-50" onClick={() => setSearchResult([])}>
             
            <section className="w-full h-[32rem] flex flex-col justify-center items-center gap-8 px-12">
                <h1 className="text-3xl font-bold z-10">Search for an anime...</h1>
                <div className="w-full flex bg-[#151F2E] items-center rounded shadow-lg drop-shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-8 mx-2 text-slate-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input className="bg-transparent w-full h-10 outline-none px-2 caret-rose-500 tracking-wide text-slate-50" onChange={(e) => handleChange(e)}/>
                </div>
                <div className={searchResult.length > 0 ? "w-full opacity-100 bg-[#151F2E] drop-shadow-lg rounded transition-opacity flex gap-2 flex-col justify-around" : "h-[192px] w-full opacity-0 bg-slate-800 rounded transition-opacity"}>
                    {searchResult.length > 0 ? searchResult.map((el) => (
                        <div className="flex items-center gap-2 px-2 hover:bg-slate-900 hover:bg-opacity-50 transition cursor-pointer">
                            <img src={el.images.jpg.image_url} className="h-12 w-8 rounded"/>
                            <a href="#">{el.title}</a>
                        </div>
                    )) : null}
                </div>
            </section>
            
            <div className="flex gap-8 flex-col justify-center w-full">
                <section className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full flex items-center justify-between text-xl max-sm:text-sm px-12">
                        <h1 className="font-bold">Current season</h1>
                        <a className="cursor-pointer text-sm p-2 bg-transparent hover:bg-rose-500 transform hover:translate-x-2 rounded transition-all hover:text-slate-50" tabIndex={0}>View more</a>
                    </div>
                    <div className="flex gap-4 justify-center flex-shrink flex-wrap">
                        {
                            items.length > 0 ? items.slice(0, 6).map(anime => (
                                <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] relative" tabIndex={0}>
                                    <img className="h-full w-full rounded cursor-pointer" src={anime.images.jpg.image_url} draggable={false}/>
                                    <div className="h-full w-full text-slate-50 bg-slate-900 rounded absolute left-0 top-0 bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                                        <span className="font-bold text-ellipsis whitespace-nowrap overflow-hidden w-10/12">{anime.title}</span>
                                        <span className="text-sm">{anime.status}</span>
                                    </div>
                                </div>
                            )) : Array(6).fill(0).map(() => (<div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] animate-pulse bg-slate-800 rounded"></div>))
                        }
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full flex items-center justify-between text-xl max-sm:text-sm px-12">
                        <h1 className="font-bold">Upcoming season</h1>
                        <a className="cursor-pointer text-sm p-2 bg-transparent hover:bg-rose-500 transform hover:translate-x-2 rounded transition-all hover:text-slate-50" tabIndex={0}>View more</a>
                    </div>
                    <div className="flex gap-4 justify-center flex-shrink flex-wrap">
                        {
                            items.length > 12 ? items.slice(6, 12).map(anime => (
                                <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] relative" tabIndex={0}>
                                    <img className="h-full w-full rounded cursor-pointer" src={anime.images.jpg.image_url} draggable={false}/>
                                    <div className="h-full w-full text-slate-50 bg-slate-900 rounded absolute left-0 top-0 bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                                        <span className="font-bold text-ellipsis whitespace-nowrap overflow-hidden w-10/12">{anime.title}</span>
                                        <span className="text-sm">{anime.status}</span>
                                    </div>
                                </div>
                            )) : Array(6).fill(0).map(() => (<div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] animate-pulse bg-slate-800 rounded"></div>))
                        }
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full flex items-center justify-between text-xl max-sm:text-sm px-12">
                        <h1 className="font-bold">Top anime</h1>
                        <a className="cursor-pointer text-sm p-2 bg-transparent hover:bg-rose-500 transform hover:translate-x-2 rounded transition-all hover:text-slate-50" tabIndex={0}>View more</a>
                    </div>
                    <div className="flex gap-4 justify-center flex-shrink flex-wrap">
                        {
                            items.length === 18
                            ? items.slice(12).map(anime => (
                                <div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] relative" tabIndex={0}>
                                    <img className="h-full w-full rounded cursor-pointer" src={anime.images.jpg.image_url} draggable={false}/>
                                    <div className="h-full w-full text-slate-50 bg-slate-900 rounded absolute left-0 top-0 bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                                        <span className="font-bold text-ellipsis whitespace-nowrap overflow-hidden w-10/12">{anime.title}</span>
                                        <span className={anime.rank === 1 ? "text-yellow-400 font-bold text-lg" : anime.rank === 2 ? "text-slate-400 font-bold text-lg" : "text-orange-400 font-bold text-lg"}>{anime.rank}º</span>
                                    </div>
                                </div>
                            )) : Array(6).fill(0).map(() => (<div className="h-[16rem] w-[11rem] max-sm:h-[9rem] max-sm:w-[6rem] animate-pulse bg-slate-800 rounded"></div>))
                        }
                    </div>
                </section>
            </div>
        </main>
        </>
    )
}

export default Home