import { useEffect, useState } from "react";
import jikan_api from "../api/jikan/routes";
import Loading from "../components/icons/Loading";
import Heart from "../components/icons/Heart";
import useAuth from "../hooks/useAuth";
import muramasa_api from "../api/muramasa/routes";
import popupMessage from "../modules/toaster";
import { MediaData, JikanAnime, JikanNew, JikanCharacterCard, JikanStaff, JikanGenreObject, ReviewData, JikanVoiceObject } from "../modules/mediaData";
import TextEditor from "../components/TextEditor";
import { EditorState, convertToRaw } from "draft-js";
import { saveMedia, updateMedia, remove, favorite } from "../modules/mediaModules";
import lz from "lz-string";
import Review from "../components/Review";
import { generatePages } from "../modules/pagination";
import CharacterCard from "../components/CharacterCard";
import NewsCard from "../components/NewsCard";
import StaffCard from "../components/StaffCard";

const default_media: MediaData = {id: null, code: 0, name: '', imgUrl: '', type: 'anime', favorited: 0, count: 0, length: -1, status: 1, score: 0, review: null};

interface Reviews {
    reviews: Array<ReviewData>,
    total: number
}

function Media() {
    const auth = useAuth();
    const [media, setMedia] = useState<JikanAnime | null>(null);
    const [existentMedia, setExistentMedia] = useState<MediaData>(default_media);
    const [page, setPage] = useState<string>('characters');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [review, setReview] = useState<string>(JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())));
    const [reviews, setReviews] = useState<Reviews>({reviews: [], total: 0});
    const [reviewPage, setReviewPage] = useState<number>(0);

    useEffect(() => {
        if(auth.isAuthenticated && (media && typeof media != 'number')) {
            const api = muramasa_api.media.auth(auth.authObject?.token || '');
            api.get(media.mal_id, auth.authObject?.animeListId as number)
            .then(res => {
                setExistentMedia(res.data);
                if(res.data.review) {
                    setReview(lz.decompressFromBase64(res.data.review.text));
                }
            })
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
                    if(res.data.data) 
                        setMedia({...res.data.data})
                    else popupMessage.error("Anime not found.");
                })
                .catch(() => {popupMessage.error("Anime not found.")});
            }, 500);
        }else
        if(page == 'characters' && media.characters == null) {
            jikan_api.getCharacters(id, "anime")
            .then(res => {res.data.data.sort((curr: any, next: any) => next.favorites-curr.favorites);setMedia({...media, 'characters': res.data.data})});
        }else if(page == 'news' && media.news == null) {
            jikan_api.getNews(id, "anime").then(res => {setMedia({...media, 'news': res.data.data})})
        }else if(page == 'staff' && media.staff == null) {
            jikan_api.getStaff(id, "anime").then(res => {setMedia({...media, 'staff': res.data.data})});
        }else if(page == 'reviews') {
            muramasa_api.media.getMediaReviews(media.mal_id, reviewPage)
            .then(res => {setReviews({reviews: res.data.content, total: res.data.totalPages});});
        }
    }, [media, page, reviewPage]);

    useEffect(() => {
        if(media && existentMedia.code === 0) {
            setExistentMedia({...existentMedia, 'length': media.episodes || 0, 'imgUrl': media.images.webp.large_image_url, 'code': media.mal_id, 'name': media.title});
        }
    }, [existentMedia]);
    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            {
                media ? (
                    <>
                    <div className="flex justify-around w-full max-sm:flex-col max-sm:w-10/12 max-xl:gap-4">
                        <div className="flex flex-col gap-4 max-sm:text-center">
                            <img src={media.images.webp.large_image_url} className="rounded object-cover w-64 max-sm:w-full"/>
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
                        <div className="w-8/12 max-sm:w-full max-xl:w-full max-md:w-full">
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
                                    : auth.isAuthenticated ?
                                    <div className="flex gap-2 h-9 justify-center max-sm:mt-4">
                                        <button className="bg-rose-500 px-4 rounded hover:bg-rose-600 transition-all font-medium" onClick={() => setShowModal(true)}>Add to list</button>
                                    </div> : null
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
                                <span className={page == 'reviews' ? "font-medium cursor-pointer transition-all" : "cursor-pointer text-slate-400 transition-all"} onClick={() => setPage('reviews')}>Reviews</span>
                            </div>
                            <br/><br/>
                            <div className="flex flex-wrap gap-4 max-sm:h-96 max-sm:w-full max-sm:overflow-y-auto">
                                {page == 'characters' ?
                                media.characters ? media.characters.map((character: JikanCharacterCard) => (
                                    <CharacterCard character={character} key={character.character.mal_id}/>
                                )) : <Loading/>
                                : page == 'news' ? media.news ? media.news.map((news: JikanNew) => (
                                    <NewsCard news={news} key={news.mal_id}/>
                                )) : <Loading/> : 
                                page == 'staff' ? media.staff ? media.staff.map((person: JikanStaff) => (
                                    <StaffCard person={person} key={person.person.mal_id}/>
                                )) : <span>News not found.</span>: reviews.total > 0 ? ( 
                                <div className="flex flex-col w-full gap-4 justify-center items-center"> 
                                    {reviews.reviews.map((review: ReviewData) => (
                                        <Review review={review} key={review.id}/>
                                    ))}
                                    <div className="flex gap-1">
                                        {generatePages(reviewPage, reviews.total).map((num: number) => (
                                            <span
                                                onClick={() => setReviewPage(num-1)} 
                                                className={(num-1 === reviewPage ? "font-medium" : "") + " bg-darkocean text-sm px-2 py-1 cursor-pointer rounded-lg"}>
                                                    {num}
                                            </span>
                                        ))}
                                    </div>  
                                </div>
                                ) : <span>Reviews not found.</span>
                                }
                            </div>
                        </div>
                    </div>
                    { showModal && 
                    <div className="fixed w-full min-h-screen bg-black bg-opacity-30 top-0 flex justify-center items-center transition-all animate-fade">
                        <div className="w-4/12 p-4 rounded bg-darkocean max-xl:w-full max-xl:m-2 max-h-[620px] overflow-y-auto">
                            <header className="flex justify-between items-center">
                                <span className="font-medium text-slate-50">{media.title}</span>
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
                                <section className="flex gap-4">
                                    <div>
                                        <h2 className="font-medium text-sm">View count: </h2>
                                        <input 
                                            type="number" 
                                            min="0" max={media.episodes} step="1" 
                                            className="mt-4 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500"
                                            value={existentMedia['count']}
                                            onChange={(e) => setExistentMedia({...existentMedia, 'count': Number(e.target.value)})}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-medium text-sm">Score: </h2>
                                        <input
                                            type="number" 
                                            min="0" max="10" step="0.1" 
                                            className="mt-4 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500"
                                            value={existentMedia['score']}
                                            onChange={(e) => setExistentMedia({...existentMedia, 'score': Number(e.target.value)})}
                                        />
                                    </div>
                                </section>
                                <br/>
                                <section className="flex gap-2">
                                    <h2 className="font-medium text-sm">Favorite: </h2>
                                    <button onClick={() => setExistentMedia({...existentMedia, 'favorited': existentMedia['favorited'] === 0 ? 1 : 0})}>
                                        <Heart outline={!existentMedia['favorited']}/>
                                    </button>
                                </section>
                                <br/>
                                <section className="flex gap-2 flex-col">
                                    <h2 className="font-medium text-sm">Write a review: <span className="italic text-slate-500 ml-2">Max. 5000 characters</span> </h2>
                                    <TextEditor text={review} setText={setReview} maxLen={5000}/>
                                </section>
                            </main>
                            <footer className="flex justify-between max-xl:flex-col">
                                {existentMedia.id ? <span 
                                    className="text-sm underline cursor-pointer" 
                                    onClick={() => {
                                        remove(existentMedia, auth.authObject?.token || '');
                                        setExistentMedia(default_media);
                                        setShowModal(false);
                                        setReview(JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())));
                                    }}>
                                    Remove anime
                                </span> : <span></span>}
                                <button 
                                className="bg-rose-500 px-4 py-2 rounded font-medium cursor-pointer hover:bg-rose-600 transition-all float-right"
                                onClick={() => {
                                    !existentMedia.id ? 
                                        saveMedia(existentMedia, review, auth.authObject?.token || '', setExistentMedia, setReview)
                                    : updateMedia(existentMedia, review, auth.authObject?.token || '');
                                    setShowModal(false)}}
                                >Save</button>
                            </footer>
                        </div>
                    </div>}
                    </>
                ) : media != -1 ? <Loading/> : <h2>Anime not found.</h2>}
        </main>
    )
}

export default Media;