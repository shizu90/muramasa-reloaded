function Footer() {
    return (
        <footer className="w-full bg-slate-950 flex max-sm:flex-col justify-around max-sm:justify-center items-start max-sm:items-center gap-8 pb-12 pt-12 text-slate-400">
            <div className="w-[18rem] flex flex-col gap-4">
                <h2 className="font-bold text-lg">Muramasa</h2>
                <div className="h-[1px] w-4/12 bg-rose-800"></div>
                <p className="text-sm">Study purpose created system, layout inspired by Anilist website. Backend with spring boot and frontend with reactjs. Developed by shizu90.</p>
            </div>
            <div className="w-[18rem] flex flex-col gap-4">
                <h2 className="font-bold text-lg">Technologies used</h2>
                <div className="h-[1px] w-4/12 bg-rose-800"></div>
                <ul className="text-sm flex flex-col gap-2">
                    <li><a href="https://react.dev/" target="_blank">ReactJS</a></li>
                    <li><a href="https://vitejs.dev/" target="_blank">ViteJS</a></li>
                    <li><a href="https://spring.io/projects/spring-boot" target="_blank">Spring Boot</a></li>
                    <li><a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a></li>
                    <li><a href="https://jikan.moe/" target="_blank">Jikan API</a></li>
                </ul>
            </div>
            <div className="w-[18rem] flex flex-col gap-4">
                <h2 className="font-bold text-lg">Contact</h2>
                <div className="h-[1px] w-4/12 bg-rose-800"></div>
                <ul className="text-sm flex flex-col gap-2">
                    <li><a href="#" target="_blank">Repository</a></li>
                    <li><a href="#" target="_blank">Github</a></li>
                    <li><a href="#" target="_blank">Twitter</a></li>
                    <li><a href="#" target="_blank">Email</a></li>
                    <li><a href="#" target="_blank">Linkedin</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer