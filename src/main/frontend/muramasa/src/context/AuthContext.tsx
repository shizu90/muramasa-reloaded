import { createContext, useState } from "react";

export interface Auth {
    id: number,
    username: string,
    userImg: string,
    email: string,
    animeListId: number,
    mangaListId: number,
    token: string
}

export interface IAuthContext {
    auth: Auth | null,
    setAuth: (auth: Auth | null) => void
}

export const AuthContext = createContext<IAuthContext | null>(null);

function getAuth() {
    if(document.cookie.length > 0) {
        let obj = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
        return obj;
    }
    if(localStorage.getItem("auth")) {
        let obj = localStorage.getItem("auth");
        return JSON.parse(obj as string);
    }
    return null;
}

const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useState<Auth | null>(getAuth());

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;