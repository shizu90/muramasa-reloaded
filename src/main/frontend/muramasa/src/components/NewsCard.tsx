import { JikanNew } from "../modules/mediaData";

interface NewsCardProps {
    news: JikanNew
}

function NewsCard(props: NewsCardProps) {
    return (
        <a href={props.news.url} target="_blank" key={props.news.mal_id}>
        <div className="flex flex-col bg-darkocean rounded w-60 max-sm:w-full max-xl:w-44 h-96">
            <img src={props.news.images.jpg.image_url} className="w-full h-40 object-cover rounded"/>
            <span className="w-full text-center text-sm font-medium mt-2">{props.news.title}</span><br/>
            <p className="w-full text-center text-sm text-slate-400 p-2 text-ellipsis">{props.news.excerpt}</p>
        </div>
        </a>
    )
}

export default NewsCard;