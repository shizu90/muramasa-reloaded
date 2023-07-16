import Reply from "./icons/Reply";
import Heart from "./icons/Heart";

function Post() {
    return (
        <div className="w-full bg-darkocean p-4 rounded-xl hover:bg-slate-800">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center justify-center">
                    <img src="https://i.pinimg.com/originals/4c/d8/a4/4cd8a4bfbabd0cc0f68e2db64a3e1db2.jpg" className="w-14 max-sm:w-12 rounded-xl object-cover"/>
                    <div className="flex flex-col">
                        <h2 className="font-medium max-sm:text-md text-lg">Gumiya</h2>
                        <span className="text-sm max-sm:text-[10px] text-slate-500 font-medium">2023-07-11 23:48:51</span>
                    </div>
                </div>
                <button className="bg-rose-500 px-6 py-2 rounded-lg font-medium text-sm">Follow</button>
            </div>
            <div className="text-sm mt-4 flex flex-col">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                    containing Lorem Ipsum passages, and more recently with desktop publishing software 
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c437491643371.5e3789ca6ce29.gif" className="rounded-xl"/>
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c437491643371.5e3789ca6ce29.gif" className="rounded-xl"/>
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c437491643371.5e3789ca6ce29.gif" className="rounded-xl"/>
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c437491643371.5e3789ca6ce29.gif" className="rounded-xl"/>
                </div>
            </div>
            <div className="mt-6 flex gap-4">
                <div className="flex gap-1 items-center">
                    <Heart outline/>
                    <span className="text-sm font-medium">342</span>
                </div>
                <div className="flex gap-1 items-center">
                    <Reply/>
                    <span className="text-sm font-medium">22</span>
                </div>
            </div>
        </div>
    )
}

export default Post;