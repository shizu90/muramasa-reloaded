import {useState} from 'react'
import Reply from './Reply';

interface PostProps {
    data: {'userImg': string, 'text': string, 'date': string, 'likeCount': number, 'replies': Array<any>, 'attachedImgs': Array<string>}
}

function Post(props: PostProps) {
    const [likePost, setLikePost] = useState<boolean>(false);

    const like = () => {
        setLikePost(true);
        props.data.likeCount = props.data.likeCount + 1
    }

    const unlike = () => {
        setLikePost(false);
        props.data.likeCount = props.data.likeCount - 1
    }

    return (
        <div className="w- bg-darkocean p-4 rounded-lg">
            <header className="flex justify-between items-center mb-6">
                <div className="flex gap-2 items-center">
                    <img src={props.data.userImg} className="w-12 h-12 rounded object-cover"/>
                    <span className="font-medium">Gumiya</span>
                </div>
                <span className="text-sm text-slate-500">{props.data.date}</span>
            </header>
            <div className="flex flex-col justify-center mb-4">
                <p>{props.data.text}</p>
                <div className="grid grid-cols-4 mt-8 gap-2 w-6/12 xl:w-11/12 max-lg:grid-cols-4 max-lg:w-6/12 max-md:w-full">
                    {
                        props.data.attachedImgs.map((img) => (
                            <img src={img} className="w-16 h-16 rounded object-cover cursor-pointer xl:w-24 xl:h-24"/>
                        ))
                    }
                </div>
            </div>
            <footer className="flex gap-4 pb-2 border-b-2 border-midnight">
                <div className="flex gap-1 items-center">
                    {likePost ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => unlike()}>
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => like()}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    )}
                    <span>{props.data.likeCount}</span>
                </div>
                <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                    <span>{props.data.replies.length}</span>
                </div>
            </footer>
            <div>
                {
                    props.data.replies.slice(0,2).map((reply) => (
                        <Reply data={{'userImg': reply.userImg, 'username': reply.username, 'attachedImgs': reply.attachedImgs, 'text': reply.text}}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Post;