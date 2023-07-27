import { useEffect, useState } from "react";
import jikan_api from "../api/jikan/routes";
import Loading from "../components/icons/Loading";
import Heart from "../components/icons/Heart";
import useAuth from "../hooks/useAuth";
import muramasa_api from "../api/muramasa/routes";
import popupMessage from "../modules/toaster";
import { MediaData, JikanAnime, JikanNew, JikanCharacterCard, JikanStaff, JikanGenreObject } from "../modules/mediaData";

async function saveMedia(data: MediaData, token: string, setMedia: Function) {
    return muramasa_api.media.auth(token).add(data)
    .then((res) => {popupMessage.success("Anime saved successfully.");setMedia(res.data)})
    .catch(() => popupMessage.error("Cannot save that anime."));
}

function favorite(data: MediaData, token: string) {
    muramasa_api.media.auth(token).update(data)
    .then(() => popupMessage.success(data.favorited === 0 ? "Unfavorited anime." : "Favorited anime."))
    .catch((err) => popupMessage.error(err.response.data.message));
}

function remove(data: MediaData, token: string) {
    muramasa_api.media.auth(token).delete(data)
    .then(() => popupMessage.success("Removed anime from your list."))
    .catch((err) => popupMessage.error(err.response.data.message));
}

const default_media: MediaData = {id: null, code: 0, name: '', imgUrl: '', type: 'anime', favorited: 0, count: 0, cLength: -1, status: 1};

function Media() {
    const auth = useAuth();
    const [media, setMedia] = useState<JikanAnime | null | number>(null);
    const [existentMedia, setExistentMedia] = useState<MediaData>(default_media);
    const [characters, setCharacters] = useState<Array<JikanCharacterCard> | null>(null);
    const [news, setNews] = useState<Array<JikanNew> | null>(null);
    const [staff, setStaff] = useState<Array<JikanStaff> | null>(null);
    const [page, setPage] = useState<string>('characters');
    const [showModal, setShowModal] = useState<boolean>(false);
    
    useEffect(() => {
        if(auth.isAuthenticated && (media && typeof media != 'number')) {
            muramasa_api.media.auth(auth.authObject?.token || '').get(media.mal_id, auth.authObject?.animeListId as number)
            .then(res => setExistentMedia(res.data))
            .catch(() => setExistentMedia(default_media));
        }
    }, [media]);

    useEffect(() => {
        const url: URLSearchParams = new URLSearchParams(window.location.search);
        const id: number = url.get("id") as unknown as number;
        if(media === null) {
            setTimeout(() => {
                jikan_api.getById(id, "anime")
                .then(res => {
                    setMedia(res.data.data)
                })
                .catch(() => setMedia(-1));
            }, 500);
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

    useEffect(() => {
        if((media && typeof media != 'number') && (existentMedia.imgUrl.length === 0 || existentMedia.cLength === -1)) {
            setExistentMedia({...existentMedia, 'cLength': media.episodes || 0, 'imgUrl': media.images.webp.large_image_url, 'code': media.mal_id, 'name': media.title});
        }
    }, [existentMedia]);


    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            {
                media && typeof media != 'number' ? (
                    <>
                    <div className="flex justify-around w-full max-sm:flex-col max-sm:w-10/12 max-xl:gap-4">
                        <div className="flex flex-col gap-4 max-sm:text-center">
                            <img src={media.images.webp.large_image_url} className="rounded object-cover w-64 max-xl:w-full max-sm:w-full"/>
                            <div className="bg-darkocean w-64 max-sm:w-full p-4 rounded text-sm max-sm:h-60 max-sm:overflow-y-auto">
                                <span className="font-medium">Studios</span><br/>
                                <span className="text-slate-400">{media.studios.map((studio: any, index: number) =>  index+1 == media.studios.length ? studio.name : studio.name + ', ')}</span>
                                <br/><br/>
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
                                    {media.genres.map((genre: JikanGenreObject, index: number) => index+1 == media.genres.length ? genre.name : genre.name + ', ')}
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
                                {auth.isAuthenticated && existentMedia.id ?
                                    <div className="flex gap-2 h-9 justify-center max-sm:mt-4">
                                        <button className="bg-rose-500 px-4 rounded hover:bg-rose-600 transition-all font-medium" onClick={() => setShowModal(true)}>Update</button>
                                        <button className="bg-yellow-400 px-2 rounded hover:bg-yellow-500" 
                                        onClick={_ => {
                                            let obj: MediaData = {...existentMedia, 'favorited': existentMedia.favorited === 0 ? 1 : 0}; 
                                            favorite(obj, auth.authObject?.token || '');
                                            setExistentMedia(obj);
                                        }}>
                                            <Heart 
                                                outline={existentMedia.favorited === 0 ? true : false}
                                            />
                                        </button>
                                    </div>
                                    :
                                    <div className="flex gap-2 h-9 justify-center max-sm:mt-4">
                                        <button className="bg-rose-500 px-4 rounded hover:bg-rose-600 transition-all font-medium" onClick={() => setShowModal(true)}>Add to list</button>
                                    </div>
                                }
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
                                    characters ? characters.map((character: JikanCharacterCard) => (
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
                                : page == 'news' ? news ? news.map((newsItem: JikanNew) => (
                                    <a href={newsItem.url} target="_blank" key={newsItem.mal_id}>
                                    <div className="flex flex-col bg-darkocean rounded w-60 max-sm:w-full max-xl:w-44 h-96">
                                        <img src={newsItem.images.jpg.image_url} className="w-full h-40 object-cover rounded"/>
                                        <span className="w-full text-center text-sm font-medium mt-2">{newsItem.title}</span><br/>
                                        <p className="w-full text-center text-sm text-slate-400 p-2 text-ellipsis">{newsItem.excerpt}</p>
                                    </div>
                                    </a>
                                )) : <Loading/> : staff ? staff.map((person: JikanStaff) => (
                                    <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded" key={person.person.mal_id}>
                                        <img src={person.person.images.jpg.image_url} className="w-16 rounded"/>
                                        <div>
                                            <h2 className="w-40 max-sm:w-full max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{person.person.name}</h2>
                                            <span className="text-sm text-slate-400">{
                                                person.positions.map((position: string, index: number) => index+1 == person.positions.length ? position : position + ', ')
                                            }</span>
                                        </div>
                                    </div>
                                )) : <Loading/>
                                }
                            </div>
                        </div>
                    </div>
                    { showModal && 
                    <div className="fixed w-full min-h-screen bg-black bg-opacity-30 top-0 flex justify-center items-center transition-all animate-fade">
                        <div className="w-4/12 p-4 rounded bg-darkocean max-xl:w-full max-xl:m-2">
                            <header className="flex justify-between items-center">
                                <h2 className="font-medium text-slate-50">{existentMedia.id ? "Update anime" : "Add anime"}</h2>
                                <span className="text-sm underline cursor-pointer" onClick={() => {setShowModal(false)}}>Close</span>
                            </header>
                            <main className="px-4 py-8">
                                <section>
                                    <h2 className="font-medium text-sm">Select a status: </h2>
                                    <div className="flex gap-4 mt-4 text-sm max-sm:flex-col">
                                        {
                                            ["Watching", "Completed", "Dropped", "Plan to watch", "On hold"].map((status: string, index: number) =>
                                                <span
                                                    key={index+1} 
                                                    className={
                                                        existentMedia['status'] === index+1 ? 
                                                        "p-2 bg-rose-500 hover:bg-rose-500 rounded transition-all cursor-pointer"
                                                        : "p-2 hover-bg-rose-500 rounded transition-all cursor-pointer bg-midnight"
                                                    }
                                                    onClick={() => setExistentMedia({...existentMedia, 'status': index+1, 'count': index+1 === 2 ? media.episodes || existentMedia.count : existentMedia.count})}
                                                    >
                                                    {status}
                                                </span>
                                            )
                                        }
                                    </div>
                                </section>
                                <br/>
                                <section>
                                    <h2 className="font-medium text-sm">View count: </h2>
                                    <input 
                                        type="number" 
                                        min="0" max={media.episodes} step="1" 
                                        className="mt-4 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500"
                                        value={existentMedia['count']}
                                        onChange={(e) => setExistentMedia({...existentMedia, 'count': Number(e.target.value)})}
                                    />
                                </section>
                                <br/>
                                <section className="flex gap-2">
                                    <h2 className="font-medium text-sm">Favorite: </h2>
                                    <button onClick={() => setExistentMedia({...existentMedia, 'favorited': existentMedia['favorited'] === 0 ? 1 : 0})}>
                                        <Heart outline={!existentMedia['favorited']}/>
                                    </button>
                                </section>
                            </main>
                            <footer className="flex justify-between max-xl:flex-col">
                                {existentMedia.id ? <span 
                                    className="text-sm underline cursor-pointer" 
                                    onClick={() => {
                                        remove(existentMedia, auth.authObject?.token || '');
                                        setExistentMedia(default_media);
                                        setShowModal(false);
                                    }}>
                                    Remove anime
                                </span> : <span></span>}
                                <button 
                                className="bg-rose-500 px-4 py-2 rounded font-medium cursor-pointer hover:bg-rose-600 transition-all float-right"
                                onClick={() => {
                                    saveMedia(existentMedia, auth.authObject?.token || '', setExistentMedia);
                                    setShowModal(false)}}
                                >Save</button>
                            </footer>
                        </div>
                    </div>}
                    </>
                ) : typeof media === 'number' ? (
                    <>
                        <h2>We cannot find that anime {':('}</h2>
                    </>
                ) : <Loading/>}
        </main>
    )
}

export default Media;