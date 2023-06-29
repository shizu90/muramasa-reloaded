import Input from "../components/Input";
import Post from "../components/Post";
import UserItem from "../components/UserItem";

function Social() {
    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 justify-between flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col max-xl:flex-col gap-12 text-slate-50">
            <section className="w-full">
                <h2 className="text-slate-50 font-bold text-lg mb-4">Search for users</h2>
                <div className="w-full h-10 bg-darkocean flex gap-4 justify-center items-center p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <Input name="user_search" width={"w-full"} height={"h-full"}/>
                </div>
                <div className="w-full mt-8">
                    <UserItem/>
                    <UserItem/>
                    <UserItem/>
                    <UserItem/>
                </div>
                <h2 className="text-slate-50 font-bold text-lg mb-2">Recent posts</h2>
                <ul className="flex flex-col gap-4">
                    <li>
                    <Post data={{
                    'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 
                    'likeCount': 32, 
                    'text': 'Hello World, nice to meet you.', 
                    'replies': [{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    }], 
                    'date': '23-12-2023', 
                    'attachedImgs': [
                        'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 
                        'https://cdn.wallpapersafari.com/5/29/tU5W87.jpg', 
                        'https://i.ytimg.com/vi/VLqPvznkeXA/maxresdefault.jpg', 
                        'https://wallpaperaccess.com/full/1742.jpg']}}/>
                    </li>
                    <li>
                    <Post data={{
                    'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 
                    'likeCount': 32, 
                    'text': 'Hello World, nice to meet you.', 
                    'replies': [{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    }], 
                    'date': '23-12-2023', 
                    'attachedImgs': [
                        'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 
                        'https://cdn.wallpapersafari.com/5/29/tU5W87.jpg', 
                        'https://i.ytimg.com/vi/VLqPvznkeXA/maxresdefault.jpg', 
                        'https://wallpaperaccess.com/full/1742.jpg']}}/>
                    </li>
                </ul>
            </section>
            <section className="w-full">
                <div className="flex justify-between mb-4 max-sm:flex-col">
                    <h2 className="text-slate-50 font-bold text-lg">Recent posts from friends</h2>
                    <div className="text-md max-sm:text-sm max-sm:p-0 max-sm:py-2 font-medium hover:bg-rose-500 transition-all rounded-xl p-1 px-2 cursor-pointer">+ Create post</div>
                </div>
                <ul className="flex flex-col gap-4">
                    <li>
                    <Post data={{
                    'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 
                    'likeCount': 32, 
                    'text': 'Hello World, nice to meet you.', 
                    'replies': [{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    },{
                        'userImg': 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg',
                        'username': 'Gumiya',
                        'text': 'Hello world you too nice to meet you too.',
                        'attachedImgs': ['https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg']
                    }], 
                    'date': '23-12-2023', 
                    'attachedImgs': [
                        'https://wallpapers.com/images/featured/phm0pdngie1gchj9.jpg', 
                        'https://cdn.wallpapersafari.com/5/29/tU5W87.jpg', 
                        'https://i.ytimg.com/vi/VLqPvznkeXA/maxresdefault.jpg', 
                        'https://wallpaperaccess.com/full/1742.jpg']}}/>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default Social;