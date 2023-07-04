import { useEffect, useState } from "react";
import jikan_api from "../api/jikan/routes";
import Loading from "../components/icons/Loading";
import Heart from "../components/icons/Heart";

function Media() {
    const [media, setMedia] = useState<any>(null);
    const [characters, setCharacters] = useState<any>(null);
    const [news, setNews] = useState<any>(null);
    const [staff, setStaff] = useState<any>(null);
    const [page, setPage] = useState<string>('characters');
    
    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        const id = url.get("id") as unknown as number;
        if(media === null) {
            setTimeout(() => {
                jikan_api.getById(id, "anime")
                .then(res => setMedia(res.data.data))
                .catch(() => setMedia(-1));
            }, 500);
            setTimeout(() => {

            }, 300);
        }
        if(page == 'characters' && characters == null) {
            jikan_api.getCharacters(id, "anime")
            .then(res => {res.data.data.sort((curr: any, next: any) => next.favorites-curr.favorites);setCharacters(res.data.data)});
        }else if(page == 'news' && news == null) {
            jikan_api.getNews(id, "anime").then(res => {setNews(res.data.data)})
        }else if(page == 'staff' && staff == null) {
            jikan_api.getStaff(id, "anime").then(res => setStaff(res.data.data));
        }
    }, [media, page]);
    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            {
                media != -1 && media ? (
                    <div className="flex justify-around w-full max-sm:flex-col max-sm:w-10/12 max-xl:gap-4">
                        <div className="flex flex-col gap-4 max-sm:text-center">
                            <img src={media.images.webp.large_image_url} className="rounded object-cover w-64 max-xl:w-full max-sm:w-full"/>
                            <div className="bg-darkocean w-full p-4 rounded text-sm max-sm:h-60 max-sm:overflow-y-auto">
                                <span className="font-medium">Season</span><br/>
                                <span className="text-slate-400">{media.season ? (media.season as string).slice(0, 1).toUpperCase() + (media.season as string).slice(1) : '-'} - {media.year}</span>
                                <br/><br/>
                                <span className="font-medium">Type</span><br/>
                                <span className="text-slate-400">{media.type}</span>
                                <br/><br/>
                                <span className="font-medium">Rating</span><br/>
                                <span className="text-slate-400">{media.score > 0 ? media.score : '-'}</span>
                                <br/><br/>
                                <span className="font-medium">Favorites</span><br/>
                                <span className="text-slate-400">{media.favorites}</span>
                                <br/><br/>
                                <span className="font-medium">Rank</span><br/>
                                <span className="text-slate-400">{media.rank || '-'}</span>
                                <br/><br/>
                                <span className="font-medium">Status</span><br/>
                                <span className="text-slate-400">{media.status}</span>
                                <br/><br/>
                                <span className="font-medium">Episodes</span><br/>
                                <span className="text-slate-400">{media.episodes || '-'}</span>
                                <br/><br/>
                                <span className="font-medium">Duration</span><br/>
                                <span className="text-slate-400">{media.duration}</span>
                                <br/><br/>
                                <span className="font-medium">Date</span><br/>
                                <span className="text-slate-400">{media.aired.from ? media.aired.from.split('T')[0] : '-'} - {media.aired.to ? media.aired.to.split('T')[0] : '-'}</span>
                                <br/><br/>
                                <span className="font-medium">Genres</span><br/>
                                <span className="text-slate-400">
                                    {media.genres.map((genre: any, index: number) => index+1 == media.genres.length ? genre.name : genre.name + ', ')}
                                </span>
                            </div>
                        </div>
                        <div className="w-8/12 max-sm:w-full max-md:w-full">
                            <div className="flex justify-between max-sm:flex-col">
                                <div className="flex flex-col gap-1">
                                <h2 className="font-medium text-xl max-sm:mt-4">{media.title}</h2>
                                <span className="text-sm text-slate-400">Japanese title: {media.title_japanese}</span>
                                <span className="text-sm text-slate-400">English title: {media.title_english}</span>
                                </div>
                                <div className="flex gap-2 h-9 justify-center max-sm:mt-4">
                                    <button className="bg-rose-500 px-4 rounded hover:bg-rose-600 transition-all font-medium">Add to list</button>
                                    <button className="bg-yellow-400 px-2 rounded hover:bg-yellow-500">
                                        <Heart outline={false}/>
                                    </button>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <p className="w-full text-sm text-slate-400">{media.synopsis}</p>
                            <br/>
                            <br/>
                            <div className="flex gap-2">
                                <span className={page == 'characters' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('characters')}>Characters</span>
                                <span className={page == 'staff' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('staff')}>Staff</span>
                                <span className={page == 'news' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('news')}>News</span>
                            </div>
                            <br/><br/>
                            <div className="flex flex-wrap gap-4 max-sm:h-96 max-sm:w-full max-sm:overflow-y-auto">
                                {page == 'characters' ?
                                    characters ? characters.map((character: any) => (
                                        <a href={`/character?id=${character.character.mal_id}`} key={character.character.mal_id} className="max-sm:w-full">
                                        <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded">
                                            <img src={character.character.images.webp.image_url} className="w-16 rounded"/>
                                            <div>
                                                <h2 className="w-40 max-sm:w-full max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{character.character.name}</h2>
                                                <span className="text-sm text-slate-400">{character.role}</span>
                                            </div>
                                        </div>
                                        </a>
                                    )) : <Loading/>
                                : page == 'news' ? news ? news.map((newsItem: any) => (
                                    <a href={newsItem.url} target="_blank" key={newsItem.mal_id}>
                                    <div className="flex flex-col bg-darkocean rounded w-60 max-sm:w-full max-xl:w-44 h-96">
                                        <img src={newsItem.images.jpg.image_url} className="w-full h-40 object-cover rounded"/>
                                        <span className="w-full text-center text-sm font-medium mt-2">{newsItem.title}</span><br/>
                                        <p className="w-full text-center text-sm text-slate-400 p-2 text-ellipsis">{newsItem.excerpt}</p>
                                    </div>
                                    </a>
                                )) : <Loading/> : staff ? staff.map((person: any) => (
                                    <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded" key={person.person.mal_id}>
                                        <img src={person.person.images.jpg.image_url} className="w-16 rounded"/>
                                        <div>
                                            <h2 className="w-40 max-sm:w-full max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{person.person.name}</h2>
                                            <span className="text-sm text-slate-400">{
                                                person.positions.map((position: any, index: number) => index+1 == person.positions.length ? position : position + ', ')
                                            }</span>
                                        </div>
                                    </div>
                                )) : <Loading/>
                                }
                            </div>
                        </div>
                    </div>
                ) : media === -1 ? (
                    <>
                        <h2>We cannot find that anime {':('}</h2>
                    </>
                ) : <Loading/>}
        </main>
    )
}

export default Media;