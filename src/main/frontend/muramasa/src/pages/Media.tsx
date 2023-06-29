import { useEffect, useState } from "react";
import jikan_api from "../api/jikan/routes";
import Loading from "../components/Loading";

function Media() {
    const [media, setMedia] = useState<any>(null);
    const [characters, setCharacters] = useState<any>(null);
    const [page, setPage] = useState<string>('characters');
    const [news, setNews] = useState<any>(null);
    
    const type = window.location.href.indexOf("anime") > -1 ? "anime" : "manga";
    
    useEffect(() => {
        if(media === null) {
            
            const url = new URLSearchParams(window.location.search);
            const id = url.get("id") as unknown as number;
            setTimeout(() => {
                jikan_api.getById(id)
                .then(res => setMedia(res.data.data))
                .catch(err => setMedia(-1));
                jikan_api.getCharacters(id, type)
                .then(res => {res.data.data.sort((curr: any, next: any) => next.favorites-curr.favorites);setCharacters(res.data.data)});
                jikan_api.getNews(id).then(res => {setNews(res.data.data)})
            }, 500);
        }
    }, [media]);
    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            {
                media != -1 && media ? (
                    <div className="flex justify-around w-full">
                        <div className="flex flex-col gap-4">
                            <img src={media.images.webp.large_image_url} className="rounded object-cover w-64"/>
                            <div className="bg-darkocean w-full p-4 rounded text-sm">
                                <span className="font-medium">Season</span><br/>
                                <span className="text-slate-400">{media.season ? (media.season as string).slice(0, 1).toUpperCase() + (media.season as string).slice(1) : NaN} - {media.year}</span>
                                <br/><br/>
                                <span className="font-medium">Type</span><br/>
                                <span className="text-slate-400">{media.type}</span>
                                <br/><br/>
                                <span className="font-medium">Rating</span><br/>
                                <span className="text-slate-400">{media.score > 0 ? media.score : NaN}</span>
                                <br/><br/>
                                <span className="font-medium">Favorites</span><br/>
                                <span className="text-slate-400">{media.favorites}</span>
                                <br/><br/>
                                <span className="font-medium">Rank</span><br/>
                                <span className="text-slate-400">{media.rank || NaN}</span>
                                <br/><br/>
                                <span className="font-medium">Status</span><br/>
                                <span className="text-slate-400">{media.status}</span>
                                <br/><br/>
                                <span className="font-medium">{type == 'anime' ? 'Episodes' : 'Chapters'}</span><br/>
                                <span className="text-slate-400">{media.episodes || NaN}</span>
                                <br/><br/>
                                {type == 'anime' ? (
                                    <>
                                    <span className="font-medium">Duration</span><br/>
                                    <span className="text-slate-400">{media.duration}</span>
                                    <br/><br/>
                                    </>
                                ): null}
                                <span className="font-medium">Date</span><br/>
                                <span className="text-slate-400">{media.aired.from ? media.aired.from.split('T')[0] : NaN} - {media.aired.to ? media.aired.to.split('T')[0] : NaN}</span>
                                <br/><br/>
                                <span className="font-medium">Genres</span><br/>
                                <span className="text-slate-400">
                                    {media.genres.map((genre: any, index: number) => index+1 == media.genres.length ? genre.name : genre.name + ', ')}
                                </span>
                            </div>
                        </div>
                        <div className="w-8/12">
                            <h2 className="font-medium text-xl">{media.title}</h2>
                            <span className="text-sm text-slate-400">Japanese title: {media.title_japanese}</span><br/>
                            <span className="text-sm text-slate-400">English title: {media.title_english}</span>
                            <br/>
                            <br/>
                            <p className="w-full text-sm text-slate-400">{media.synopsis}</p>
                            <br/>
                            <br/>
                            <div className="flex gap-2">
                                <span className={page == 'characters' ? "font-medium cursor-pointer" : "cursor-pointer text-slate-400"} onClick={() => setPage('characters')}>Characters</span>
                                <span className={page == 'news' ? "font-medium cursor-pointer" : "cursor-pointer text-slate-400"} onClick={() => setPage('news')}>News</span>
                            </div>
                            <br/><br/>
                            <div className="flex flex-wrap gap-4">
                                {page == 'characters' ?
                                    characters ? characters.map((character: any) => (
                                        <div className="flex flex-row cursor-pointer w-60 gap-2 bg-darkocean rounded">
                                            <img src={character.character.images.webp.image_url} className="w-16 rounded"/>
                                            <div>
                                                <h2 className="w-40 text-ellipsis truncate font-medium pt-2">{character.character.name}</h2>
                                                <span className="text-sm text-slate-400">{character.role}</span>
                                            </div>
                                        </div>
                                    )) : null
                                : news.map((newsItem: any) => (
                                    <a href={newsItem.url} target="_blank">
                                    <div className="flex flex-col bg-darkocean rounded">
                                        <img src={newsItem.images.jpg.image_url} className="w-60 h-40 object-cover rounded"/>
                                        <span className="w-60 text-center text-sm font-medium mt-2">{newsItem.title}</span><br/>
                                        <p className="w-60 text-center text-sm text-slate-400 p-2">{newsItem.excerpt}</p>
                                    </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : media === -1 ? (
                    <>
                        <h2>We cannot find that {type} {':('}</h2>
                    </>
                ) : <Loading/>}
        </main>
    )
}

export default Media;