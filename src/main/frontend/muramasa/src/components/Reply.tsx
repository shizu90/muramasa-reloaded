interface ReplyProps {
    data: {'userImg': string, 'username': string, 'text': string, 'attachedImgs': Array<string>}
}

function Reply(props: ReplyProps) {
    return (
        <div className="bg-darkocean p-2 border-b-2 border-midnight">
            <header className="flex gap-2 items-center">
                <img src={props.data.userImg} className="h-8 w-8 object-cover rounded"/>
                <span className="text-sm font-medium">{props.data.username}</span>
            </header>
            <div className="mt-2 flex flex-col gap-4">
                <span className="text-sm">{props.data.text}</span>
                <div className="flex flex-shrink gap-2">
                    {
                        props.data.attachedImgs.map((img) => (
                            <img src={img} className="w-12 h-12 object-cover rounded cursor-pointer"/>
                        ))
                    }
                </div>
            </div>
        </div>   
    )
}

export default Reply;