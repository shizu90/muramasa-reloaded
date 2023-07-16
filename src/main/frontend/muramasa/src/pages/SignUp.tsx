import { useState } from "react";
import { FormInput } from "../components/FormInput";
import muramasa_api from "../api/muramasa/routes";
import { toast } from "react-hot-toast";

interface IFormData {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

function isFormValid(formData: IFormData) {
    if(!(formData["email"].match("[a-z0-9]+@[a-z]+\.[a-z]{2,3}"))) {
        return false;
    }
    if(!(formData["username"].match("^(?=.{4,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"))) {
        return false;
    }
    if(!(formData["password"].match("^.{6,24}$"))) {
        return false;
    }
    if(!(formData["password"] === formData["confirmPassword"])) {
        return false;
    }
    return true;
}

function SignUp() {
    const [formData, setFormData] = useState<IFormData>({'username': '', 'email': '', 'password': '', 'confirmPassword': ''});

    function submit(event: React.FormEvent<HTMLFormElement>, formData: IFormData) {
        event.preventDefault();
        setFormData({"username": "", "email": "", "password": "", "confirmPassword": ""});
        if(isFormValid(formData)){
            muramasa_api.user.register(formData)
            .then(() => toast("Account successfully created.", {className: "bg-green-600 text-slate-50 font-medium"}))
            .catch(err => toast(err.response.data.message, {className: "bg-rose-500 text-slate-50 font-medium"}));
        }
    }

    return (
        <main className="w-full flex justify-center">
            <form className="flex flex-col gap-4 bg-darkocean p-8 justify-center max-sm:w-full w-[480px] items-center text-slate-50" onSubmit={(e) => {submit(e, formData)}}>
                <h1 className="text-xl font-medium">Register</h1>
                <FormInput 
                inputType="text"
                name="email" 
                label={"Email: "}
                placeholder="Email" 
                value={formData["email"]} 
                onChange={(e) => {setFormData({...formData, "email": e.target.value})}}
                errorMessage={"Invalid e-mail format."}
                errorEval={formData["email"].length > 0 && !(formData["email"].match("[a-z0-9]+@[a-z]+\.[a-z]{2,3}"))}/>
                <FormInput
                inputType="text"
                name="username"
                label={"Username: "}
                placeholder="Username"
                value={formData["username"]}
                onChange={(e) => setFormData({...formData, "username": e.target.value})}
                errorMessage={"Invalid username."}
                errorEval={formData["username"].length > 0 && !(formData["username"].match("^(?=.{4,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"))}
                />
                <FormInput
                inputType="password"
                name="password"
                label={"Password: "}
                placeholder="Password"
                value={formData["password"]}
                onChange={(e) => setFormData({...formData, "password": e.target.value})}
                errorMessage={"Invalid password."}
                errorEval={formData["password"].length > 0 && !(formData["password"].match("^.{6,24}$"))}
                />
                <FormInput
                inputType="password"
                name="confirmPassword"
                label={"Confirm password: "}
                placeholder="Confirm password"
                value={formData["confirmPassword"]}
                onChange={(e) => setFormData({...formData, "confirmPassword": e.target.value})}
                errorMessage={"Passwords should be equal."}
                errorEval={formData["password"] !== formData["confirmPassword"]}
                />
                {isFormValid(formData) ?
                    <button className="bg-rose-500 px-8 py-2 rounded font-medium" type="submit">Sign Up</button>
                    :
                    <button className="px-8 py-2 rounded font-medium border-rose-500 border" type="submit" disabled>Sign Up</button>
                }
                <span className="text-sm text-slate-400 py-8">Already have? <a href="/login" className="text-rose-500 hover:underline cursor-pointer">Login here</a></span>
            </form>
        </main>
    )
}
export default SignUp