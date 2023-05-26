import { useState } from "react";

function Home() {
    const [data, setData] = useState<Array<any>>(Array(16).fill(0));



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
           </section>
           <section className="w-6/12 max-sm:w-full max-md:w-full max-lg:w-7/12">
                <h2 className="text-slate-50 font-bold text-lg mb-14">Updates from following</h2>
                <ul className="flex flex-col gap-8">
                    {
                        data.map(zero => (
                            <li className="w-full h-[3rem] bg-slate-800 animate-pulse rounded" id="item"></li>
                        ))
                    }
                </ul>
                <button className="text-slate-50 bg-rose-500 px-2 py-1 rounded mt-12">View more</button>
           </section>
        </main>
    )
}

export default Home