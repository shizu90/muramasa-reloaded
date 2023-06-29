import { useState } from "react";

interface ReplyProps {
    data: {'userImg': string, 'username': string, 'text': string, 'attachedImgs': Array<string>}
}

function Reply(props: ReplyProps) {
    const [showImg, setShowImg] = useState<number | null>(null);

    return (
        <div className="bg-darkocean p-2 pb-4 pt-4 border-b-2 border-midnight">
            <header className="flex gap-2 items-center">
                <img src={props.data.userImg} className="h-8 w-8 object-cover rounded"/>
                <span className="text-sm font-medium">{props.data.username}</span>
            </header>
            <div className="mt-2 flex flex-col gap-4">
                <span className="text-sm">{props.data.text}</span>
                <div className="flex flex-shrink gap-2">
                    {
                        props.data.attachedImgs.map((img, index) => (
                            <>
                                <img src={img} className="w-12 h-12 object-cover rounded cursor-pointer" onClick={() => {setShowImg(index)}}/>
                                {showImg === index ? (
                                    <div className="bg-black bg-opacity-[30%] w-full min-h-screen fixed top-0 left-0 flex justify-center items-center animation-pulse" onClick={() => {setShowImg(null)}}>
                                        <img src={img} className="w-[26rem] rounded"/>
                                    </div>
                                ) : <></>}
                            </>
                        ))
                    }
                </div>
            </div>
        </div>   
    )
}

export default Reply;