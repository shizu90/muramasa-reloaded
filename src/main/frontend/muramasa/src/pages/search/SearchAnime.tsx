import { useState } from "react"; 
import { currentSeason, currentSeasonStartingMonth, currentYear, getSeasonStartingMonth } from "../../modules/season";
import capitallize from "../../modules/capitallize";

function SearchAnime() {
    const [filters, setFilters] = useState({'year': currentYear, 'season': currentSeason, 'status': 'airing', 'type': 'tv', 'startDate': `${currentYear}-${currentSeasonStartingMonth}-01`});

    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            <div className="flex gap-2 w-full text-sm font-medium">
                <a href="#" className="px-4 py-2 max-sm:p-2 bg-darkocean rounded text-center">Top animes</a>
                <a href="#" className="px-4 py-2 max-sm:p-2 bg-darkocean rounded text-center">Current season</a>
                <a href="#" className="px-4 py-2 max-sm:p-2 bg-darkocean rounded text-center">Upcoming season</a>
            </div>
            <div className="w-full flex gap-4 justify-center items-center max-sm:flex-col">
                <div className="w-6/12 max-sm:w-full">
                    <h2 className="font-medium text-slate-50 mb-2">Search for...</h2>
                    <input className="w-full bg-darkocean outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 font-medium"/>
                </div>
                <div className="w-6/12 max-sm:w-full">
                    <h2 className="font-medium text-slate-50 mb-2">Filters</h2>
                    <div className="flex gap-2">
                        <input 
                        type="number" min="1940" max={Number(currentYear) + 1} 
                        step="1" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 w-32 max-sm:w-20 font-medium" 
                        placeholder="Year" onChange={(e) => setFilters({...filters, 'year': e.target.value, 'startDate': `${e.target.value}-${getSeasonStartingMonth(filters['season'])}-01`})} value={filters['year']}/>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Season" readOnly value={capitallize(filters['season'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'winter', 'startDate': `${filters['year']}-${getSeasonStartingMonth('winter')}-01`})}>Winter</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'spring', 'startDate': `${filters['year']}-${getSeasonStartingMonth('spring')}-01`})}>Spring</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'summer', 'startDate': `${filters['year']}-${getSeasonStartingMonth('summer')}-01`})}>Summer</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'fall', 'startDate': `${filters['year']}-${getSeasonStartingMonth('fall')}-01`})}>Fall</h2>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['status'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'airing'})}>Airing</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'complete'})}>Complete</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'upcoming'})}>Upcoming</h2>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['type'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'tv'})}>Tv</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'movie'})}>Movie</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'ova'})}>Ova</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'special'})}>Special</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'ona'})}>Ona</h2>
                                <h2 className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'music'})}>Music</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SearchAnime;