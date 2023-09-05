import { useEffect, useState } from "react";
import jikan_api from "../../api/jikan/routes";
import Loading from "../../components/icons/Loading";
import { redirectToPage } from "../../modules/pagination";
import { redirect } from "../../modules/redirection";
import Pagination from "../../components/Pagination";

let urlParams = new URLSearchParams(window.location.search);
let mounted = true;
const currentPage = Number(urlParams.get('page') as any)
function SearchCharacter() {
    const [query, setQuery] = useState<string>(urlParams.get('q') || '');
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        if(content === null) {
            jikan_api.searchCharacters(currentPage || 1, 24, urlParams.get('q') as string || '')
            .then(res => setContent(res.data));
        }
    }, [])

    useEffect(() => {
        if(!mounted) {
            const delay = setTimeout(() => {
                let currParams = urlParams;
                currParams.set('q', query);
                currParams.delete('page');
                redirect(currParams);
            }, 600);
            return () => clearTimeout(delay);
        }else mounted = false;
    }, [query]);

    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12 py-32">
            <div className="w-full flex gap-4 justify-center items-center max-sm:flex-col">
                <div className="max-sm:w-full w-4/12">
                    <span className="font-medium text-slate-50 mb-2">Search for...</span>
                    <input className="w-full bg-darkocean outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 font-medium" value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
            </div>
            <div className="w-full h-40 flex flex-wrap flex-1 gap-10 max-sm:gap-4 justify-center items-center">
                {
                    content ? 
                        content.data.length > 0 ? content.data.map((character: any) => (
                            <a href={`/character?id=${character.mal_id}`} key={character.mal_id}>
                                <div className="flex flex-col gap-1 w-40 h-full text-slate-300 hover:text-rose-500 transition-all max-sm:h-[9rem] max-sm:w-[5rem]">
                                    <img src={character.images.jpg.image_url} className="w-full max-sm:h-36 h-60 object-cover cursor-pointer rounded"/>
                                    <span className="truncate text-ellipsis text-sm font-medium">{character.name}</span>
                                </div>
                            </a>
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

export default SearchCharacter;