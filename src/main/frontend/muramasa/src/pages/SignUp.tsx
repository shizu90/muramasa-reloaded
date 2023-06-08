function SignUp() {
    return (
        <main className="w-full flex justify-center items-center">
            <form className="mt-[6rem] flex flex-col gap-4 bg-darkocean p-8 justify-center items-center text-slate-50">
                <h1 className="text-xl font-medium">Register</h1>
                <div className="flex flex-col gap-2">
                    <label>Email: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Email" id="email"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Username: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Username" id="username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Password" id="password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Confirm password: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-midnight rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Confirm password" id="confirmpassword"/>
                </div>
                <button className="bg-rose-500 px-8 py-2 rounded font-medium" type="submit">Sign Up</button>
                <span className="text-sm text-slate-400 py-8">Already have? <a href="/login" className="text-rose-500 hover:underline cursor-pointer">Login here</a></span>
            </form>
        </main>
    )
}
export default SignUp