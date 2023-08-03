import draftToHtml from "draftjs-to-html";
import { ReviewData } from "../modules/mediaData";
import htmlParser from "html-to-react";
import lz from "lz-string";

interface ReviewProps {
    review: ReviewData
}

function Review(props: ReviewProps) {
    return (
        <div className="flex flex-col gap-4 w-full p-3 rounded-lg bg-darkocean">
            <header className="flex justify-between">
                <div className="flex gap-2">
                    <img src={props.review.reviewer.imgUrl || "https://i.pinimg.com/originals/4c/d8/a4/4cd8a4bfbabd0cc0f68e2db64a3e1db2.jpg"} className="w-12 h-12 rounded-lg"/>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-md">{props.review.reviewer.username}</span>
                        <span className="text-slate-500 text-sm">{props.review.reviewedAt}</span>
                    </div>
                </div>
                <span className="text-sm text-slate-500">Score: <span className="text-slate-50 text-md font-medium">{props.review.score}</span></span>
            </header>
            <main className="p-2 w-full">
                <p className="w-full">{htmlParser.Parser().parse(draftToHtml(JSON.parse(lz.decompressFromUTF16(props.review.text))))}</p>
            </main>
        </div>
    )
}

export default Review;