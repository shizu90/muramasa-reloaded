import { JikanStaff, JikanVoiceObject } from "../modules/mediaData";

interface StaffCardProps {
    person: JikanStaff & JikanVoiceObject
}

function StaffCard(props: StaffCardProps) {
    return (
        <div className="flex flex-row cursor-pointer w-60 max-sm:w-full gap-2 max-xl:w-48 bg-darkocean rounded" key={props.person.person.mal_id}>
            <img src={props.person.person.images.jpg.image_url} className="w-16 rounded"/>
            <div className="flex flex-col">
                <span className="w-40 max-sm:w-full max-xl:w-28 text-ellipsis truncate font-medium pt-2 max-sm:text-sm">{props.person.person.name}</span>
                {props.person.positions ? 
                <span className="text-sm text-slate-500">{
                    props.person.positions.map((position: string, index: number) => index+1 == props.person.positions.length ? position : position + ', ')
                }</span> : <span className="text-sm text-slate-500">{props.person.language}</span>}
            </div>
        </div>
    )
}

export default StaffCard;