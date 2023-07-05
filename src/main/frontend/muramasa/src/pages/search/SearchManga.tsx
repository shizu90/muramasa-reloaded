import { useState } from "react";
import capitallize from "../../modules/capitallize";
import { currentYear } from "../../modules/season";

function SearchManga() {
    const [filters, setFilters] = useState({'status': 'publishing', 'type': 'manga'});
    
    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            <div className="flex gap-2 w-full text-sm font-medium">
                <a href="#" className="px-4 py-2 max-sm:p-2 bg-darkocean rounded text-center">Top mangas</a>
            </div>
            <div className="w-full flex gap-4 justify-center items-center max-sm:flex-col">
                <div className="w-6/12 max-sm:w-full">
                    <h2 className="font-medium text-slate-50 mb-2">Search for...</h2>
                    <input className="w-full bg-darkocean outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 font-medium"/>
                </div>
                <div className="w-6/12 max-sm:w-full">
                    <h2 className="font-medium text-slate-50 mb-2">Filters</h2>
                    <div className="flex gap-2">
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['status'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-900 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'publishing'})}>Publishing</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'complete'})}>Complete</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'hiatus'})}>Hiatus</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'discontinued'})}>Discontinued</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'upcoming'})}>Upcoming</h2>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['type'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manga'})}>Manga</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manhwa'})}>Manhwa</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manhua'})}>Manhua</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'novel'})}>Novel</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'lightnovel'})}>Lightnovel</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'oneshot'})}>Oneshot</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'doujin'})}>Doujin</h2>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['type'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manga'})}>Manga</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manhwa'})}>Manhwa</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manhua'})}>Manhua</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'novel'})}>Novel</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'lightnovel'})}>Lightnovel</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'oneshot'})}>Oneshot</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'doujin'})}>Doujin</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SearchManga;