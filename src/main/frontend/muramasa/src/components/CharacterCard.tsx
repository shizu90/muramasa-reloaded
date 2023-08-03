import { JikanCharacterCard } from "../modules/mediaData";

interface CharacterCardProps {
    character: JikanCharacterCard
}

function CharacterCard(props: CharacterCardProps) {
    return (
        <a href={`/character?id=${props.character.character.mal_id}`} key={props.character.character.mal_id} className="max-sm:w-full">
        <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded">
            <img src={props.character.character.images.webp.image_url} className="w-16 rounded"/>
            <div className="flex flex-col">
                <span className="w-40 max-sm:w-full max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{props.character.character.name}</span>
                <span className="text-sm text-slate-400">{props.character.role}</span>
            </div>
        </div>
        </a>
    )
}

export default CharacterCard;