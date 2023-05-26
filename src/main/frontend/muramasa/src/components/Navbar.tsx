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
        <header className={"w-full h-20 fixed top-0 flex justify-around items-center px-12 transition bg-[#152232] z-50"} id="header">
            <h1 className="text-white text-2xl font-bold tracking-wider items-center">MURAMASA</h1>
            <nav className={"z-10 flex gap-4 max-sm:flex-col text-slate-300 font-bold items-center max-sm:absolute relative max-sm:w-full max-sm:bg-[#152232] py-4 max-sm:top-20 max-sm:px-2 transition-all" + (navVisible ? " transition-y-0" : " max-sm:translate-y-[-20rem]")}>
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <a href="#" className="hover:text-white transition-colors">Social</a>
                <a href="#" className="hover:text-white transition-colors">Search</a>
                <div className="mx-6 flex gap-4 max-sm:flex-col max-sm:mx-0 items-center">
                    <a href="/login" className="hover:text-white transition-colors">Login</a>
                    <a href="#" className="hover:text-white transition-colors bg-rose-500 px-4 py-1 rounded">Sign Up</a>
                </div>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-50 hidden max-sm:block" onClick={() => setNavVisible(!navVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </header>
    )
}

export default Navbar