import {useState} from 'react'
import Reply from './Reply';

interface PostProps {
    data: {'userImg': string, 'text': string, 'date': string, 'likeCount': number, 'replies': Array<any>, 'attachedImgs': Array<string>}
}

function Post(props: PostProps) {
    const [likePost, setLikePost] = useState<boolean>(false);
    const [showImg, setShowImg] = useState<number | null>(null);
    const [showDetailed, setShowDetailed] = useState<boolean>(false);

    const like = () => {
        setLikePost(true);
        props.data.likeCount = props.data.likeCount + 1
    }

    const unlike = () => {
        setLikePost(false);
        props.data.likeCount = props.data.likeCount - 1
    }

    return (
        <div className="bg-darkocean rounded-lg p-4">
            <header className="flex justify-between items-center mb-6">
                <div className="flex gap-2 items-center">
                    <img src={props.data.userImg} className="w-10 h-10 rounded object-cover"/>
                    <span className="font-medium">Gumiya</span>
                </div>
            </header>
            <div className="flex flex-col justify-center mb-2 w-full">
                <p className="break-all mb-2">{props.data.text}</p>
                {
                    props.data.attachedImgs.length > 0 ?
                    props.data.attachedImgs.length < 2 ?
                    <> 
                        <img src={props.data.attachedImgs[0]} className="rounded-lg cursor-pointer" onClick={() => setShowImg(0)}/>
                        {showImg === 0 ? (
                            <div className="bg-black bg-opacity-[30%] w-full min-h-screen fixed top-0 left-0 flex justify-center items-center animation-pulse" onClick={() => {setShowImg(null)}}>
                                <img src={props.data.attachedImgs[0]} className="w-[26rem] rounded"/>
                            </div>
                        ) : <></>}
                    </>
                    : <div className="flex flex-wrap gap-2">
                        {props.data.attachedImgs.map((img, index) => (
                            <div className="w-[40%]">
                                <img src={img} className="h-full rounded-lg cursor-pointer" onClick={() => setShowImg(index)}/>
                                {showImg === index ? (
                                    <div className="bg-black bg-opacity-[30%] w-full min-h-screen fixed top-0 left-0 flex justify-center items-center animation-pulse" onClick={() => {setShowImg(null)}}>
                                        <img src={img} className="w-[26rem] rounded"/>
                                    </div>
                                ) : <></>}
                            </div>  
                        ))}
                    </div> : null
                }
            </div>
            <footer className="flex gap-4 pb-2 border-b-2 border-midnight items-center justify-between">
                <div className="flex gap-4">
                    <div className="flex gap-1 items-center">
                        {likePost ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => unlike()}>
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => like()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        )}
                        <span>{props.data.likeCount}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <span>{props.data.replies.length}</span>
                    </div>
                </div>
                <span className="text-[12px] text-slate-500 float-right">{props.data.date}</span>
            </footer>
            <div>
                {
                    !showDetailed ? props.data.replies.slice(0,2).map((reply) => (
                        <Reply data={{'userImg': reply.userImg, 'username': reply.username, 'attachedImgs': reply.attachedImgs, 'text': reply.text}}/>
                    )) : props.data.replies.map((reply) => (
                        <Reply data={{'userImg': reply.userImg, 'username': reply.username, 'attachedImgs': reply.attachedImgs, 'text': reply.text}}/>
                    ))
                }
            </div>
            <span className="text-sm underline cursor-pointer mt-4" onClick={() => {setShowDetailed(!showDetailed)}}>
                {showDetailed ? 'Hide replies' : 'View all replies'}
            </span>
        </div>
    )
}

export default Post;