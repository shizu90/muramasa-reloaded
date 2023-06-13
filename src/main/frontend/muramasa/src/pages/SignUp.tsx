import Input from "../components/Input"

function SignUp() {
    return (
        <main className="w-full flex justify-center">
            <form className="mt-[6rem] flex flex-col gap-4 bg-darkocean p-8 justify-center items-center text-slate-50">
                <h1 className="text-xl font-medium">Register</h1>
                <div className="flex flex-col gap-2">
                    <label>Email: </label>
                    <Input name="email" bgColor={"bg-midnight"} placeholder={"Email"}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Username: </label>
                    <Input name="username" bgColor={"bg-midnight"} placeholder={"Username"}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password: </label>
                    <Input name="password" bgColor={"bg-midnight"} placeholder={"Password"}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Confirm password: </label>
                    <Input name="confirmPassword" bgColor={"bg-midnight"} placeholder={"Confirm password"}/>
                </div>
                <button className="bg-rose-500 px-8 py-2 rounded font-medium" type="submit">Sign Up</button>
                <span className="text-sm text-slate-400 py-8">Already have? <a href="/login" className="text-rose-500 hover:underline cursor-pointer">Login here</a></span>
            </form>
        </main>
    )
}
export default SignUp