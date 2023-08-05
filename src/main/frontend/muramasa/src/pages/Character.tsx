import {useState, useEffect} from 'react';
import jikan_api from "../api/jikan/routes";
import Loading from '../components/icons/Loading';
import Heart from '../components/icons/Heart';
import muramasa_api from "../api/muramasa/routes";
import useAuth from '../hooks/useAuth';
import { JikanCharacter } from '../modules/mediaData';
import popupMessage from "../modules/toaster";
import StaffCard from '../components/StaffCard';
import MediaCard from '../components/MediaCard';

function favoriteCharacter(token: string, character: JikanCharacter, setFavorited: Function) {
    const api = muramasa_api.character.auth(token);
    api.favorite({id: null, code: character.mal_id, name: character.name, img: character.images.webp.image_url})
    .then(_ => {popupMessage.success("Favorited character.");setFavorited(true);})
    .catch(_ => popupMessage.error("Cannot favorite character."));
}

function unfavoriteCharacter(token: string, character: JikanCharacter, setFavorited: Function) {
    const api = muramasa_api.character.auth(token);
    api.unfavorite(character.mal_id)
    .then(_ => {popupMessage.success("Unfavorited character.");setFavorited(false);})
    .catch(_ => popupMessage.error("Cannot unfavorite character."));
}

function Character() {
    const auth = useAuth();
    const [character, setCharacter] = useState<JikanCharacter | number>();
    const [favorited, setFavorited] = useState<boolean>(false);
    const [page, setPage] = useState<string>("about");

    useEffect(() => {
        if(auth.authObject?.token && auth.authObject?.token.length > 0) {
            if(character && typeof character != "number") {
                muramasa_api.character.auth(auth.authObject?.token).get(character.mal_id)
                .then(_ => setFavorited(true))
                .catch(_ => setFavorited(false));
            }
        }
    }, [character]);

    useEffect(() => {
        if(character == null) {
            const url = new URLSearchParams(window.location.search);
            const id = url.get("id") as unknown as number;
            setTimeout(() => {
                jikan_api.getCharacterById(id).then(res => {setCharacter(res.data.data)}).catch(() => setCharacter(-1));
            }, 500);
        }
    }, [character]);

    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12 py-32">
            {
                character ? typeof character != "number" ? (
                        <div className="flex justify-around w-full max-sm:flex-col max-sm:w-10/12 max-sm:text-center max-xl:gap-4">
                            <div className="flex flex-col gap-4 w-64">
                                <img src={character.images.webp.image_url} className="rounded object-cover max-xl:w-full max-sm:w-full"/>
                            </div>
                            <div className="w-8/12 max-sm:w-full max-md:w-full">
                                <div className="flex justify-between max-sm:flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="font-medium text-xl max-sm:mt-4">{character.name}</h2>
                                        <span className="text-sm text-slate-400">Kanji: {character.name_kanji}</span>
                                        <span className="text-sm text-slate-400">Nicknames: {character.nicknames.map((nickname: string, index: number) => index+1==character.nicknames.length ? nickname : nickname + ', ')}</span>
                                    </div>
                                    <div className="flex gap-2 h-9 justify-center">
                                        {auth.authObject &&
                                            <button 
                                                className="bg-yellow-400 px-2 rounded hover:bg-yellow-500" 
                                                onClick={() => {favorited ? 
                                                    unfavoriteCharacter(auth.authObject?.token || "", character, setFavorited) : 
                                                    favoriteCharacter(auth.authObject?.token || "", character, setFavorited)}}
                                                >
                                                <Heart outline={favorited ? false : true}/>
                                            </button>
                                        }
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="flex gap-2">
                                    <span className={page == 'about' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('about')}>About</span>
                                    <span className={page == 'voices' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('voices')}>Voice actors</span>
                                    <span className={page == 'anime' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('anime')}>Animes</span>
                                    <span className={page == 'manga' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('manga')}>Mangas</span>
                                </div>
                                <div className="flex flex-wrap gap-4 max-sm:h-96 max-sm:overflow-y-auto mt-4">
                                {
                                    page == 'voices' ? character.voices.length > 0 ? character.voices.map((voice: any) => (
                                        <StaffCard person={voice}/>
                                    )) : <h2>This character haven't been dubbed yet {':('}</h2> :
                                    page == 'anime' ? character.anime.length > 0 ? character.anime.map((anime: any) => (
                                        <MediaCard type={"anime"} media={anime.anime}/>
                                    )) : (
                                        <h2>This character haven't been in an anime yet {':('}</h2>
                                    ) : page == 'manga' ? character.manga.length > 0 ? character.manga.map((manga: any) => (
                                        <MediaCard type={"manga"} media={manga.manga}/>
                                    )) : <h2>This character haven't been in a manga yet {':('}</h2>
                                    : (
                                        <p className="text-sm text-slate-400 font-medium">{character.about}</p>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                ) : <h2>Cannot found that character {':('}</h2> : <Loading/>
            }
        </main>
    )
}

export default Character;