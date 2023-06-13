import { useState } from "react";

function Navbar() {
    const [navVisible, setNavVisible] = useState<boolean>(false);

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

    return (
        <header className={"w-full h-20 fixed top-0 flex justify-around items-center px-12 transition bg-darkocean z-50"} id="header">
            <a className="text-white text-2xl font-bold tracking-wider items-center cursor-pointer" href="/">MURAMASA</a>
            <nav className={"z-10 flex gap-4 max-sm:flex-col text-slate-300 font-medium items-center max-sm:absolute relative max-sm:w-full max-sm:bg-darkocean py-4 max-sm:top-20 max-sm:px-2 transition-all" + (navVisible ? " transition-y-0" : " max-sm:translate-y-[-22rem]")}>
                <a href="/home" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Home</a>
                <a href="/social" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Social</a>
                <a href="#" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Search</a>
                <div className="mx-6 flex gap-4 max-sm:flex-col max-sm:mx-0 items-center">
                    <a href="/login" className="hover:text-slate-50 focus:text-slate-50 transition-colors">Login</a>
                    <a href="/signup" className="hover:text-slate-50 focus:text-slate-50 transition-colors hover:bg-rose-500 focus:bg-rose-500 px-4 py-1 rounded">Sign Up</a>
                </div>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-50 hidden max-sm:block" onClick={() => setNavVisible(!navVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </header>
    )
}

export default Navbar