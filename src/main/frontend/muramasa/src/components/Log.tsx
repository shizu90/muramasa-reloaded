interface LogProps {
    data?: {'img': string, 'msg': string, 'date': string}
}

function Log(props: LogProps) {
    return (
        props.data ? (
            <div className="flex flex-col bg-darkocean rounded-lg">
                <header className="pr-1 pt-1">
                    <span className="float-right text-sm text-slate-500">{props.data.date}</span>
                </header>
                <div className="flex gap-2 items-center pb-2 pl-2 pr-2">
                    <img src={props.data.img} className="h-10 w-10 rounded"/>
                    <p className="truncate text-ellipsis w-full text-sm">{props.data.msg}</p>
                </div>
            </div>
        ) : (
            <div className="w-full h-[3rem] bg-slate-800 animate-pulse rounded"></div>
        )
    )
}

export default Log;