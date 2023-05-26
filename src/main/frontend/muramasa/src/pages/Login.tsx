function Login() {
    return (
        <main className="w-full flex justify-center items-center">
            <form className="mt-[6rem] flex flex-col gap-4 bg-[#151F2E] p-8 justify-center items-center text-slate-50">
                <h1 className="text-xl font-bold">Login</h1>
                <div className="flex flex-col gap-2">
                    <label>Email: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Email"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Password"/>
                </div>
                <button className="bg-rose-500 px-8 py-2 rounded font-bold" type="submit">Login</button>
                <a href="/resetpassword" className="text-sm text-slate-400 py-2 hover:underline transition-all cursor-pointer">Forgot password?</a>
                <span className="text-sm text-slate-400 py-8">Don't have an account? <a href="/signup" className="text-rose-500 hover:underline cursor-pointer">Create here</a></span>
            </form>
        </main>
    )
}

export default Login