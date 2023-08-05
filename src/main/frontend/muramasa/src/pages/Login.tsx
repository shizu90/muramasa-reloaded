import { useState } from "react"
import { FormInput } from "../components/FormInput"
import muramasa_api from "../api/muramasa/routes";
import popupMessage from "../modules/toaster";

interface IFormData {
    username: string,
    password: string,
    rememberMe: boolean
}

function isFormValid(formData: IFormData) {
    if(!(formData["username"].match("^(?=.{4,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"))) {
        return false;
    }
    if(!(formData["password"].match("^.{6,24}$"))) {
        return false;
    }
    return true;
}


function Login() {
    const [formData, setFormData] = useState<IFormData>({"username": "", "password": "", "rememberMe": false});
    
    function submit(event: React.FormEvent<HTMLFormElement>, formData: IFormData): void {
        event.preventDefault();
        setFormData({"username": "", "password": "", "rememberMe": false});
        if(isFormValid(formData)) {
            muramasa_api.user.login({"username": formData.username, "password": formData.password})
            .then((res) => 
            {
                popupMessage.success(`Welcome back, ${formData.username}!`);
                let auth = res.data;
                if(formData.rememberMe) {
                    document.cookie = `auth=${JSON.stringify(auth)}; expires=Session`
                    localStorage.removeItem("auth");
                }else { 
                    localStorage.setItem("auth", JSON.stringify(auth));
                    document.cookie = "auth=; max-age=0";
                }        
                window.location.href = "/";
            })
            .catch(err => popupMessage.error(err.response.data.message))
        }
    }
    return (
        <main className="w-full flex justify-center py-32">
            <form className="flex flex-col gap-4 bg-darkocean max-sm:w-full w-[480px] p-8 justify-center items-center text-slate-50" onSubmit={(e) => submit(e, formData)}>
                <h1 className="text-xl font-medium">Login</h1>
                <FormInput
                inputType="text"
                name="username"
                placeholder="Username"
                label="Username: "
                value={formData["username"]}
                onChange={(e) => {setFormData({...formData, "username": e.target.value})}}
                errorMessage="Invalid username."
                errorEval={formData["username"].length > 0 && !(formData["username"].match("^(?=.{4,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"))}
                />
                <FormInput
                inputType="password"
                name="password"
                placeholder="Password"
                label="Password: "
                value={formData["password"]}
                onChange={(e) => {setFormData({...formData, "password": e.target.value})}}
                errorMessage="Invalid password."
                errorEval={formData["password"].length > 0 && !(formData["password"].match("^.{6,24}$"))}
                />
                <div className="flex items-center">
                    <input 
                    id="remember_me" 
                    type="checkbox" 
                    value="" 
                    className="w-4 h-4 accent-rose-500 bg-midnight border-midnight rounded" 
                    onClick={() => setFormData({...formData, "rememberMe": !formData["rememberMe"]})}/>
                    <label htmlFor="remember_me" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                {isFormValid(formData) ? 
                    <button className="bg-rose-500 px-8 py-2 rounded font-medium" type="submit">Login</button>
                    :
                    <button className="px-8 py-2 rounded font-medium border border-rose-500" disabled>Login</button>
                }
                <a href="/resetpassword" className="text-sm text-slate-400 py-2 hover:underline transition-all cursor-pointer">Forgot password?</a>
                <span className="text-sm text-slate-400 py-8">Don't have an account? <a href="/signup" className="text-rose-500 hover:underline cursor-pointer">Create here</a></span>
            </form>
        </main>
    )
}

export default Login