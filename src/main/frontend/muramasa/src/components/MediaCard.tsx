import { JikanMedia } from "../modules/mediaData";

interface MediaCardProps {
    type: "anime" | "manga",
    media: JikanMedia
}

function MediaCard(props: MediaCardProps) {
    return (
        <a href={`/${props.type}?id=${props.media.mal_id}`} key={props.media.mal_id}>
            <div className="flex flex-col gap-1 w-40 h-full text-slate-300 hover:text-rose-500 transition-all max-sm:w-24">
                <img src={props.media.images.webp.image_url} className="w-full h-56 max-sm:h-36 object-cover cursor-pointer rounded"/>
                <span className="truncate text-ellipsis text-sm font-medium">{props.media.title}</span>
            </div>
        </a>
    )
}

export default MediaCard;