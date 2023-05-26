function ForgotPassword() {
    return (
        <main className="w-full flex justify-center items-center">
            <form className="mt-[6rem] flex flex-col gap-4 bg-[#151F2E] p-8 justify-center items-center text-slate-50">
                <h1 className="text-xl font-bold">Reset password</h1>
                <div className="flex flex-col gap-2">
                    <label>Email: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Email"/>
                </div>
                <button className="bg-rose-500 px-8 py-2 rounded font-bold" type="submit">Reset</button>
                <a href="/login" className="text-sm text-slate-400 py-8 hover:underline cursor-pointer">Login</a>
            </form>
        </main>
    )
}

export default ForgotPassword