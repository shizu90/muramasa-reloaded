import {useState, useEffect} from 'react';
import jikan_api from "../api/jikan/routes";
import Loading from '../components/Loading';
import Heart from '../components/Heart';

function getAge(about: string) {
    const index_age = about.indexOf('Age');
    const index_birthday = about.indexOf('Birthday') == -1 ? about.indexOf('Birthdate') : about.indexOf('Birthday');
    if(index_age > -1 && index_birthday > -1) {
        return about.substring(index_age + 5, index_birthday - 1);
    }
    return null;
}

function getBirthday(about: string) {
    const index_birthday = about.indexOf('Birthday') == -1 ? about.indexOf('Birthdate') : about.indexOf('Birthday');
    const index_height = about.indexOf('Height');
    if(index_birthday > -1 && index_height > -1) {
        return about.substring(index_birthday + 10, index_height - 1);
    }
    return null;
}

function getHeight(about: string) {
    const index_height = about.indexOf('Height');
    const index_weight = about.indexOf('Weight');
    if(index_height > -1 && index_weight > -1) {    
        return about.substring(index_height + 8, index_weight - 1);
    }
    if(index_height > -1) {return about.substring(index_height + 8, about.indexOf('cm') + 2)}
    return null;
}

function getWeight(about: string) {
    const index_weight = about.indexOf('Weight');
    const index_likes = about.indexOf('Likes');
    if(index_weight > -1 && index_likes > -1) {    
        return about.substring(index_weight + 8, index_likes - 1);
    }
    if(index_weight > -1) {return about.substring(index_weight + 8, about.indexOf('kg') + 2)}
    return null;
}

function getLikes(about: string) {
    const index_likes = about.indexOf('Likes');
    const index_dislikes = about.indexOf('Dislikes');
    if(index_likes > -1 && index_dislikes > -1) {
        return about.substring(index_likes + 6, index_dislikes - 1);
    }
    return null;
}

function getDislikes(about: string) {
    const index_quote = about.indexOf('Favorite quote');
    const index_dislikes = about.indexOf('Dislikes');
    if(index_dislikes > -1 && index_quote > -1) {
        return about.substring(index_dislikes + 9, index_quote - 1);
    }
    return null;
}

function Character() {
    const [character, setCharacter] = useState<any>(null);
    const [voices, setVoices] = useState<any>(null);

    useEffect(() => {
        if(character == null) {
            const url = new URLSearchParams(window.location.search);
            const id = url.get("id") as unknown as number;
            setTimeout(() => {
                jikan_api.getCharacterById(id).then(res => setCharacter(res.data.data)).catch(() => setCharacter(-1));
                jikan_api.getCharacterVAs(id).then(res => {console.log(res.data.data);setVoices(res.data.data)});
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
                                <div className="bg-darkocean w-full p-4 rounded text-sm max-sm:h-60 max-sm:overflow-y-auto">
                                    <span className="font-medium">Age</span><br/>
                                    <span className="text-slate-400 break-words">{getAge(character.about) || NaN}</span>
                                    <br/><br/>
                                    <span className="font-medium">Birthday</span><br/>
                                    <span className="text-slate-400 break-words">{getBirthday(character.about) || NaN}</span>
                                    <br/><br/>
                                    <span className="font-medium">Height</span><br/>
                                    <span className="text-slate-400 break-words">{getHeight(character.about) || NaN}</span>
                                    <br/><br/>
                                    <span className="font-medium">Weight</span><br/>
                                    <span className="text-slate-400 break-words">{getWeight(character.about) || NaN}</span>
                                    <br/><br/>
                                    <span className="font-medium">Likes</span><br/>
                                    <span className="text-slate-400 break-words">{getLikes(character.about) || NaN}</span>
                                    <br/><br/>
                                    <span className="font-medium">Dislikes</span><br/>
                                    <span className="text-slate-400 break-words">{getDislikes(character.about) || NaN}</span>
                                    <br/><br/>
                                    <span className="font-medium">Favorites</span><br/>
                                    <span className="text-slate-400 break-words">{character.favorites}</span>
                                    <br/><br/>
                                </div>
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
                                <span className="font-medium">Voice actors</span>
                                {
                                    voices ? voices.length > 0 ? (
                                        <div className="flex flex-wrap gap-4 max-sm:h-96 max-sm:overflow-y-auto mt-4">
                                            {
                                                voices.map((voice: any) => (
                                                    <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded">
                                                        <img src={voice.person.images.jpg.image_url} className="w-16 rounded"/>
                                                        <div>
                                                            <h2 className="w-40 max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{voice.person.name}</h2>
                                                            <span className="text-sm text-slate-400">{voice.language}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : <h2>This character haven't be dubbed yet {':('}</h2> : <Loading/>
                                }
                            </div>
                        </div>
                ) : <h2>Cannot found that character {':('}</h2> : <Loading/>
            }
        </main>
    )
}

export default Character;