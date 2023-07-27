import { useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import EllipsisVertical from "./icons/EllipsisVertical";
import Tv from "./icons/Tv";
import Book from "./icons/Book";
import User from "./icons/User";
import Settings from "./icons/Settings";
import Logout from "./icons/Logout";
import useAuth from "../hooks/useAuth";

function stylishNavbar() {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        let nav = document.querySelector("#header");
        if(lastScrollY < window.scrollY) {
            nav?.classList.add("translate-y-[-5rem]");
        }else {
            nav?.classList.remove("translate-y-[-5rem]");
        }
        lastScrollY = window.scrollY
    });
}

function Navbar() {
    const [navVisible, setNavVisible] = useState<boolean>(false);
    const auth = useAuth();
    stylishNavbar();

    function logout() {
        document.cookie = "auth=; max-age=0";
        localStorage.removeItem("auth");
        auth.logout();
    }

    return (
        <header className={"w-full h-20 fixed top-0 flex justify-around items-center px-12 transition bg-darkocean z-50"} id="header">
            <a className="text-white text-2xl font-bold tracking-wider items-center cursor-pointer" href="/">MURAMASA</a>
            <nav className={"z-10 flex gap-4 max-sm:flex-col text-slate-300 font-medium items-center max-sm:absolute relative max-sm:w-full max-sm:bg-darkocean py-4 max-sm:top-20 max-sm:px-2 transition-all" + (navVisible ? " transition-y-0" : " max-sm:translate-y-[-22rem]")}>
                {auth.isAuthenticated && <a href="/" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Home</a>}
                <a href="/social" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Social</a>
                <div className="group">
                    <button className="hover:text-slate-50 focus:text-slate-50 transition-colors flex items-center">Search <ArrowDown/></button>
                    <div className="bg-darkocean shadow-lg shadow-midnight absolute p-4 flex-col gap-2 rounded v&status=airingext-start text-sm hidden group-hover:flex group-focus:flex">
                        <a href={`/search/anime?search=current`} className="hover:text-slate-50 w-full focus:text-slate-50 transition-colors flex gap-2"><Tv/> Anime</a>
                        <a href="/search/manga" className="hover:text-slate-50 focus:text-slate-50 transition-colors flex gap-2"><Book/> Manga</a>
                        <a href="/search/character" className="hover:text-slate-50 focus:text-slate-50 transition-colors flex gap-2"><User/> Character</a>
                    </div>
                </div>
                {
                    auth.isAuthenticated ? (
                    <>
                        <div className="mx-6 flex gap-4 max-sm:mx-0 items-center">
                            <a href="#" className="hover:text-slate-50 focus:text-slate-50 items-center justify-center transition-colors flex gap-2">
                                {auth.authObject?.username}
                                <img className="w-8 h-8 rounded-lg object-cover" src={auth.authObject?.userImg ? auth.authObject.userImg : "https://tm.ibxk.com.br/2022/07/15/15134137814281.jpg?ims=1200x675"}/>
                            </a>
                        </div>
                        <div className="group">
                            <button className="hover:text-slate-50 focus:text-slate-50 transition-colors flex items-center w-5"><EllipsisVertical/></button>
                            <div className="bg-darkocean shadow-lg shadow-midnight absolute flex-col gap-2 p-4 rounded text-start text-sm hidden group-hover:flex group-focus:flex">
                                <a href="#" className="hover:text-slate-50 focus:text-slate-50 transition-colors flex gap-2"><Settings/> Settings</a>
                                <a href="/" className="hover:text-slate-50 focus:text-slate-50 transition-colors flex gap-2" onClick={() => logout()}><Logout/> Logout</a>
                            </div>
                        </div>
                    </>
                    ) : (
                    <div className="mx-6 flex gap-4 max-sm:flex-col max-sm:mx-0 items-center">
                        <a href="/login" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Login</a>
                        <a href="/signup" className="hover:text-slate-50 focus:text-slate-50 transition-colors hover:bg-rose-500 focus:bg-rose-500 px-4 py-1 rounded">Sign Up</a>
                    </div>
                    )    
                }
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-50 hidden max-sm:block" onClick={() => setNavVisible(!navVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </header>
    )
}

export default Navbar