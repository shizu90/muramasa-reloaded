import Post from "../components/Post";

function Social() {
    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 justify-between flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col max-xl:flex-col gap-12 text-slate-50 py-32">
            <div className="w-6/12">
            <Post/>
            <Post/>
            <Post/>
            </div>
        </main>
    )
}

export default Social;