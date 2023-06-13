interface UserItemProps {
    data?: {'img': string, 'username': string, 'description': string}
}

function UserItem(props: UserItemProps) {
    return (
        props.data ? (
            <div className="w-full h-[6rem] flex gap-4">
                <img src={props.data.img}></img>
                <div className="w-[20rem]">
                    <h2 className="font-medium text-ellipsis truncate w-full mb-2">{props.data.username}</h2>
                    <p className="text-sm text-slate-400 text-ellipsis truncate w-full">{props.data.description}</p>
                </div>
            </div>
        ) : (
            <div className="w-full h-[6rem] flex gap-4">
                <div className="w-[3rem] h-[3rem] animate-pulse bg-darkocean"></div>
                <div className="w-[20rem]">
                    <h2 className="font-medium text-ellipsis truncate w-full h-4 bg-darkocean animate-pulse mb-2"></h2>
                    <p className="text-sm text-slate-400 text-ellipsis truncate w-full bg-darkocean animate-pulse h-6"></p>
                </div>
            </div>
        )
    )
}

export default UserItem;