import { LogData } from "../modules/userData";

interface LogProps {
    log: LogData
}

function Log(props: LogProps) {
    return (
        <div className="flex rounded-xl bg-darkocean p-4 gap-2 justify-around hover:bg-slate-800 w-full">
            <img src={props.log.account.imgUrl.length > 0 ? props.log.account.imgUrl: "https://i.pinimg.com/236x/d0/05/0d/d0050d5c9f600d1cb362404d576aa199.jpg"} className="w-12 object-cover rounded-xl"/>
            <div className='flex flex-col w-10/12'>
                <div className="flex w-10/12 justify-between">
                    <span className="font-medium text-md">{props.log.account.username}</span>
                    <span className="text-[12px] text-slate-500">{props.log.date}</span>
                </div>
                <p className="text-[12px] max-w-10/12 truncate text-ellipsis break-all">{props.log.message}</p>
            </div>
        </div>
    )
}

export default Log;