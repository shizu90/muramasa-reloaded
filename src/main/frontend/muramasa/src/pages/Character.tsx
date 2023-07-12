import {useState, useEffect} from 'react';
import jikan_api from "../api/jikan/routes";
import Loading from '../components/icons/Loading';
import Heart from '../components/icons/Heart';

function Character() {
    const [character, setCharacter] = useState<any>(null);
    const [page, setPage] = useState<string>("about");

    useEffect(() => {
        if(character == null) {
            const url = new URLSearchParams(window.location.search);
            const id = url.get("id") as unknown as number;
            setTimeout(() => {
                jikan_api.getCharacterById(id).then(res => {console.log(res.data.data);setCharacter(res.data.data)}).catch(() => setCharacter(-1));
            }, 500);
        }
    }, [character]);

    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            {
                character ? character != -1 ? (
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
                                        <button className="bg-yellow-400 px-2 rounded hover:bg-yellow-500">
                                            <Heart outline={false}/>
                                        </button>
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
                                        <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded">
                                            <img src={voice.person.images.jpg.image_url} className="w-16 rounded"/>
                                            <div>
                                                <h2 className="w-40 max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{voice.person.name}</h2>
                                                <span className="text-sm text-slate-400">{voice.language}</span>
                                            </div>
                                        </div>
                                    )) : <h2>This character haven't been dubbed yet {':('}</h2> :
                                    page == 'anime' ? character.anime.length > 0 ? character.anime.map((anime: any) => (
                                        <a href={`/anime?id=${anime.anime.mal_id}`}>
                                        <div className="flex flex-col gap-2 w-40 text-center max-sm:w-20">
                                            <img src={anime.anime.images.webp.image_url} className="rounded"/>
                                            <h2 className="font-medium text-sm break-words">{anime.anime.title}</h2>
                                        </div>
                                        </a>
                                    )) : (
                                        <h2>This character haven't been in an anime yet {':('}</h2>
                                    ) : page == 'manga' ? character.manga.length > 0 ? character.manga.map((manga: any) => (
                                        <a href={`/manga?id=${manga.manga.mal_id}`}>
                                        <div className="flex flex-col gap-2 w-40 text-center max-sm:w-20">
                                            <img src={manga.manga.images.webp.image_url} className="rounded object-cover"/>
                                            <h2 className="font-medium text-sm break-words">{manga.manga.title}</h2>
                                        </div>
                                        </a>
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