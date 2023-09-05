import { JikanMedia } from "../modules/mediaData";

interface MediaCardProps {
    type: "anime" | "manga",
    media: JikanMedia
}

function MediaCard(props: MediaCardProps) {
    return (
        <a href={`/${props.type}?id=${props.media.mal_id}`} key={props.media.mal_id}>
            <div className="flex flex-col gap-1 w-40 h-full text-slate-300 hover:text-rose-500 transition-all max-sm:h-[9rem] max-sm:w-[5rem]">
                <img src={props.media.images.webp.image_url} className="w-full max-sm:h-36 h-60 object-cover cursor-pointer rounded"/>
                <span className="truncate text-ellipsis max-sm:text-[10px] text-sm font-medium">{props.media.title}</span>
            </div>
        </a>
    )
}

export default MediaCard;