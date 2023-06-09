function Login() {
    return (
        <main className="w-full flex justify-center">
            <form className="mt-[6rem] flex flex-col gap-4 bg-darkocean p-8 justify-center items-center text-slate-50">
                <h1 className="text-xl font-medium">Login</h1>
                <div className="flex flex-col gap-2">
                    <label>Username: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Password"/>
                </div>
                <div className="flex items-center">
                    <input id="remember_me" type="checkbox" value="" className="w-4 h-4 accent-rose-500 bg-midnight border-midnight rounded"/>
                    <label htmlFor="remember_me" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button className="bg-rose-500 px-8 py-2 rounded font-medium" type="submit">Login</button>
                <a href="/resetpassword" className="text-sm text-slate-400 py-2 hover:underline transition-all cursor-pointer">Forgot password?</a>
                <span className="text-sm text-slate-400 py-8">Don't have an account? <a href="/signup" className="text-rose-500 hover:underline cursor-pointer">Create here</a></span>
            </form>
        </main>
    )
}

export default Login