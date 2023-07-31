import { useState, useEffect } from "react";
import muramasa_api from "../api/muramasa/routes";
import Loading from "../components/icons/Loading";
import { UserData } from "../modules/userData";

function User() {
    const [user, setUser] = useState<UserData | null>(null);
    const url: URLSearchParams = new URLSearchParams(window.location.search);
    const username: string = url.get("username") as unknown as string;
    
    useEffect(() => {
        muramasa_api.user.get(username)
        .then(res => setUser(res.data))
    }, [])

    return (
        <main className="max-sm:w-full max-lg:w-full items-center justify-center flex flex-col gap-8 text-slate-50 z-10 2xl:w-8/12">
            {user ? (
                <>
                    <header className="w-full bg-darkocean h-96 rounded-lg">
                        <img 
                            src={user.bannerImgUrl.length === 0 ? "https://tm.ibxk.com.br/2022/07/15/15134137814281.jpg?ims=1200x675" : user.bannerImgUrl}
                            className="w-full h-52 object-cover relative rounded-t-lg"
                        />
                        <div className="flex gap-4 flex-start ml-8 mt-8 items-center">
                            <img 
                                src={user.imgUrl.length === 0 ? "https://tm.ibxk.com.br/2022/07/15/15134137814281.jpg?ims=1200x675" : user.imgUrl}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex flex-col gap-4">
                                <h2 className="font-medium text-xl">{user.username}</h2>
                                <p className="text-slate-400">
                                    {user.resume.length === 0 ? "Nothing to see here" : user.resume}
                                </p>
                            </div>
                        </div>
                    </header>
                </>
            ) : <Loading/>}
        </main>
    )
}

export default User;