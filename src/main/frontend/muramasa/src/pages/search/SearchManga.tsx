import { useEffect, useState } from "react";
import capitallize from "../../modules/capitallize";
import { redirect } from "../../modules/redirection";
import jikan_api from "../../api/jikan/routes";
import Loading from "../../components/icons/Loading";
import { generatePages, redirectToPage } from "../../modules/pagination";

let mounted = true;
const urlParams = new URLSearchParams(window.location.search);
const filterArr = ['q', 'status', 'type'];
const currentPage = Number(urlParams.get('page') as any);
function SearchManga() {
    const [filters, setFilters] = useState<any>({'q': urlParams.get('q') || '', 'status': urlParams.get('status') || 'any', 'type': urlParams.get('type') || 'any'});
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        if(content === null) {
            const obj: {[k:string]: any} = {};
            filterArr.forEach((filter: string) => {
                let param = urlParams.get(filter);
                if(param) obj[filter] = param;
            });
            setTimeout(() => {
                let searchParam = urlParams.get('search');
                switch(searchParam) {
                    case 'top':
                        jikan_api.getTop("manga", 24, currentPage || 1)
                        .then(res => setContent(res.data));
                        break;
                    default:
                        jikan_api.search(currentPage || 1, 24, 'manga', obj)
                        .then(res => setContent(res.data));
                        break;
                }
            }, 100);
        }
    }, []);

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
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            <div className="flex gap-2 w-full text-sm font-medium justify-center items-center">
                <a href="/search/manga?search=top" className="px-4 py-2 max-sm:p-2 bg-darkocean rounded text-center">Top mangas</a>
            </div>
            <div className="w-full flex gap-4 justify-center items-center max-sm:flex-col">
                <div className="max-sm:w-full">
                    <span className="font-medium text-slate-50 mb-2">Search for...</span>
                    <input className="w-full bg-darkocean outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 font-medium" value={filters['q']} onChange={(e) => setFilters({...filters, 'q': e.target.value})}/>
                </div>
                <div className="max-sm:w-full">
                    <span className="font-medium text-slate-50 mb-2">Filters</span>
                    <div className="flex gap-2">
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['status'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-900 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'any'})}>Any</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'publishing'})}>Publishing</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'complete'})}>Complete</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'hiatus'})}>Hiatus</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'discontinued'})}>Discontinued</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'status': 'upcoming'})}>Upcoming</span>
                            </div>
                        </div>
                        <div className="group">
                            <input 
                            type="text" className="px-4 py-2 outline-none rounded bg-darkocean text-slate-500 font-medium w-32 max-sm:w-20 cursor-pointer" 
                            placeholder="Status" readOnly value={capitallize(filters['type'])}/>
                            <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 w-32 max-sm:w-20 max-sm:px-2 max-sm:text-sm text-slate-400 font-medium px-4 py-2 border-t-[6px] border-midnight rounded">
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'any'})}>Any</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manga'})}>Manga</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manhwa'})}>Manhwa</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'manhua'})}>Manhua</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'novel'})}>Novel</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'lightnovel'})}>Lightnovel</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'oneshot'})}>Oneshot</span>
                                <span className="hover:text-slate-50 cursor-pointer transition-all" onClick={() => setFilters({...filters, 'type': 'doujin'})}>Doujin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-40 flex flex-wrap flex-1 gap-10 max-sm:gap-4 justify-center items-center">
                {
                    content ? 
                        content.data.length > 0 ? content.data.map((manga: any) => (
                            <a href={`/manga?id=${manga.mal_id}`} key={manga.mal_id}>
                                <div className="flex flex-col gap-1 w-40 h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                                    <img src={manga.images.jpg.image_url} className="w-full h-56 max-sm:h-36 object-cover cursor-pointer rounded"/>
                                    <span className="truncate text-ellipsis text-sm font-medium">{manga.title}</span>
                                </div>
                            </a>
                        )) : <span>Found anything {':('}</span>: <Loading/>
                }
            </div>
            <div className="text-white text-sm max-sm:text-[12px] font-medium flex gap-2 ">

                {content && (
                    <>
                        <span className="bg-darkocean px-2 py-1 rounded cursor-pointer text-center hover:text-rose-500 transition-all" onClick={() => redirectToPage(urlParams, 1)}>
                            {'<<'}
                        </span>
                        {generatePages(currentPage || 1, content.pagination.last_visible_page).map((page: number) => (
                            page != currentPage ? 
                                <span className="bg-darkocean px-2 py-1 rounded cursor-pointer text-center hover:text-rose-500 transition-all" 
                                    onClick={() => redirectToPage(urlParams, page)} key={page}>
                                        {page}
                                </span> 
                                :
                                <span className="bg-midnight px-2 py-1 rounded text-center hover:text-rose-500 transition-all" key={page}>
                                    {page}
                                </span>
                        ))}
                        <span className="bg-darkocean px-2 py-1 rounded cursor-pointer text-center hover:text-rose-500 transition-all" 
                            onClick={() => redirectToPage(urlParams, content.pagination.last_visible_page)}>
                                {'>>'}
                        </span>
                    </>
                )
                }
            </div>
        </main>
    )
}

export default SearchManga;