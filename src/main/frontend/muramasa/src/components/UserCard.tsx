interface UserCardProps {
    user: User
}

function UserCard(props: UserCardProps) {
    return (
        <a href={`/user?username=${props.user.username}`}>
        <div className="bg-darkocean p-4 flex rounded-lg gap-2 hover:bg-slate-800 transition-all">
            <img
                className="rounded-lg w-12 object-cover" 
                src={props.user.imgUrl.length > 0 ? props.user.imgUrl : "https://i.pinimg.com/236x/d0/05/0d/d0050d5c9f600d1cb362404d576aa199.jpg"}/>
    
            <div className="w-40">
                <h5 className="font-medium">{props.user.username}</h5>
                <p className="text-sm text-slate-300 break-all truncate text-ellipsis w-full">{props.user.resume.length > 0 ? props.user.resume : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
            </div>
        </div>
        </a>
    )
}

export default UserCard;