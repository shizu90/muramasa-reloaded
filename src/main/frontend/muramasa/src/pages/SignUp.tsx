function SignUp() {
    return (
        <main className="w-full flex justify-center items-center">
            <form className="mt-[6rem] flex flex-col gap-4 bg-[#151F2E] p-8 justify-center items-center text-slate-50">
                <h1 className="text-xl font-bold">Register</h1>
                <div className="flex flex-col gap-2">
                    <label>Email: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Email"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Username: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Confirm password: </label>
                    <input className="lg:w-96 max-sm:w-72 h-10 bg-[#0B1622] rounded outline-none placeholder-slate-500 p-2 caret-slate-500" placeholder="Confirm password"/>
                </div>
                <button className="bg-rose-500 px-8 py-2 rounded font-bold" type="submit">Sign Up</button>
                <span className="text-sm text-slate-400 py-8">Already have? <a href="/login" className="text-rose-500 hover:underline cursor-pointer">Login here</a></span>
            </form>
        </main>
    )
}
export default SignUp