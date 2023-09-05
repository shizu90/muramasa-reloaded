import { useEffect, useState } from "react"; 
import { currentYear } from "../../modules/season";
import { redirectToPage } from "../../modules/pagination";
import capitallize from "../../modules/capitallize";
import jikan_api from "../../api/jikan/routes";
import Loading from "../../components/icons/Loading";
import { redirect } from "../../modules/redirection";
import MediaCard from "../../components/MediaCard";
import Pagination from "../../components/Pagination";

function createYearArray() {
    const arr = [];
    for(let i = Number(currentYear)+1; i >= 1940;i--) {
        arr.push(i);
    }
    return arr;
}

const urlParams = new URLSearchParams(window.location.search);
const yearArr = createYearArray();
const filterArr = ['q', 'season', 'year', 'type', 'status'];
const currentPage = Number(urlParams.get('page') as any)
let mounted = true;

function SearchAnime() {
    const [content, setContent] = useState<any>(null);
    const [filters, setFilters] = useState<any>({'q': urlParams.get('q'), 'year': urlParams.get('year'), 'season': urlParams.get('season'), 'type': urlParams.get('type'), 'status': urlParams.get('status')});
    
    useEffect(() => {
        
        if(content == null) {
            const obj: {[k:string]: any} = {};
            filterArr.forEach((filter: string) => {
                let param = urlParams.get(filter);
                if(filter === 'season') {
                    if(param) obj['season'] = param;
                }else if(filter === 'year') {
                    if(param) {
                        if(Object.keys(obj).includes('season')) {
                            obj['year'] = param;
                        }else {
                            obj['start_date'] = `${param}-01-01`;
                            obj['end_date'] = `${Number(param)+1}-01-01`;
                        }
                    }else if(Object.keys(obj).includes('season')) obj['year'] = currentYear;
                }else {
                    if(param) obj[filter] = param;
                }
            });
            setTimeout(() => {
                let searchParam = urlParams.get('search');
                switch(searchParam) {
                    case 'top':
                        jikan_api.getTop("anime", 24, currentPage || 1)
                        .then(res => setContent(res.data))
                        break;
                    case 'upcoming':
                        jikan_api.getUpcomingSeason(currentPage || 1, 24)
                        .then(res => setContent(res.data))
                        break;
                    case 'current':
                        jikan_api.getSeasonNow(currentPage || 1, 24)
                        .then(res => setContent(res.data))
                        break;
                    default:
                        if(Object.keys(obj).includes('season') && !Object.keys(obj).includes('q')) {
                            jikan_api.getSeason(currentPage || 1, 24, obj['season'], obj['year'])
                            .then(res => setContent(res.data))
                            .catch(() => setContent(-1));
                        }else {
                            jikan_api.search(currentPage || 1, 24, 'anime', obj)
                            .then(res => setContent(res.data))
                            .catch(() => setContent(-1));
                        }
                        break;
                }
            }, 100);
        }
    }, [])

    useEffect(() => {
        if(!mounted) {
            let currParams = urlParams;
            const delay = setTimeout(() => {
                filterArr.forEach((filter: string) => {
                    if(filters[filter] === 'any' || filters[filter] === null || filters[filter] === '') {
                        currParams.delete(filter);
                    }else {
                        currParams.set(filter, filters[filter]);
                    }
                });
                currParams.delete('page');
                currParams.delete('search');
                redirect(currParams);
            }, 600);
            return () => clearTimeout(delay);
        }else mounted=false;
    }, [filters]);

    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12 py-32">
            <div className="flex gap-2 w-full text-sm font-medium justify-center flex-wrap">
                <a href={`/search/anime?search=top`} className="px-4 py-2 max-sm:p-2 max-sm:w-full bg-darkocean rounded text-center">Top animes</a>
                <a href={`/search/anime?search=current`} className="px-4 py-2 max-sm:p-2 max-sm:w-full bg-darkocean rounded text-center">Current season</a>
                <a href={`/search/anime?search=upcoming`} className="px-4 py-2 max-sm:p-2 max-sm:w-full bg-darkocean rounded text-center">Upcoming season</a>
            </div>
            <div className="w-full flex gap-4 justify-center items-center max-sm:flex-col">
                <div className="max-sm:w-full">
                    <span className="font-medium text-slate-50 mb-2">Search for...</span>
                    <input className="w-full bg-darkocean outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 font-medium" onChange={(e) => setFilters({...filters, 'q': e.target.value})} value={filters['q'] || ''}/>
                </div>
                <div className="max-sm:w-full">
                    <span className="font-medium text-slate-50 mb-2">Filters</span>
                    <div className="flex gap-2 flex-wrap justify-center items-center">
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Year" readOnly value={capitallize(filters['year'] || 'Any')}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 h-52 overflow-y-auto w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'year': 'any'})}>Any</span>
                                {yearArr.map((year: number) => (
                                    <span className="hover:text-slate-50 cursor-pointer transition-all" key={year} onClick={() => setFilters({...filters, 'year': `${year}`})}>{year}</span>
                                ))}
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Season" readOnly value={capitallize(filters['season'] || 'Any')}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'any'})}>Any</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'winter'})}>Winter</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'spring'})}>Spring</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'summer'})}>Summer</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'season': 'fall'})}>Fall</span>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['status'] || 'Any')}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'any'})}>Any</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'airing'})}>Airing</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'complete'})}>Complete</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'upcoming'})}>Upcoming</span>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['type'] || 'Any')}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'any'})}>Any</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'tv'})}>Tv</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'movie'})}>Movie</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'ova'})}>Ova</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'special'})}>Special</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'ona'})}>Ona</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'music'})}>Music</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-40 flex flex-wrap flex-1 gap-10 max-sm:gap-4 justify-center items-center">
                {
                    content ? 
                        content.data.length > 0 ? content.data.map((anime: any) => (
                            <MediaCard type={"anime"} media={anime} key={anime.mal_id}/>
                        )) : <span>Found anything {':('}</span>: <Loading/>
                }
            </div>
            {content &&
                <Pagination 
                    totalPages={content.pagination.last_visible_page} 
                    currentPage={currentPage || 1} 
                    onChange={(page: number) => {redirectToPage(urlParams, page);}}
            />}
        </main>
    )
}

export default SearchAnime;