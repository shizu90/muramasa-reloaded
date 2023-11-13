import { useEffect, useState } from "react";
import muramasa_api from "../api/muramasa/routes";
import useAuth from "../hooks/useAuth";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import UserCard from "../components/UserCard";
import Search from "../components/icons/Search";
import Create from "../components/icons/Create";
import TextEditor from "../components/TextEditor";
import { EditorState, convertToRaw } from "draft-js";

interface UserSearch {
    text: string,
    page: number
}

interface UsersData {
    users: Array<User>,
    totalPages: number
}

interface ModalObject {
    show: boolean,
    type: "create" | "search"
}

function Social() {
    const auth = useAuth();
    const [userSearch, setUserSearch] = useState<UserSearch>({text: "", page: 1});
    const [users, setUsers] = useState<UsersData>({users: [], totalPages: 0});
    const [modal, setModal] = useState<ModalObject>({show: false, type: "search"});
    const [post, setPost] = useState<string>(JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())));

    useEffect(() => {
        if(userSearch.text.length > 0) {
            muramasa_api.user.search(userSearch.text, userSearch.page-1)
            .then((res) => setUsers({users: res.data.content, totalPages: res.data.totalPages}))
            .catch((err) => console.log(err));
        }
    }, [userSearch]);

    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col max-xl:flex-col gap-12 text-slate-50 py-32">
            <div className="w-full max-md:w-full flex justify-center flex-col items-center gap-5">
                <div className="flex w-full">
                    <div className="mr-0 ml-auto flex justify-center items-center gap-4">
                        {auth.isAuthenticated && <div className="flex gap-2 text-sm font-medium hover:bg-darkocean cursor-pointer rounded transition-all p-2" onClick={() => setModal({show: true, type: "create"})}>
                            <Create/>
                            <span>Create post</span>
                        </div>}
                        <div className="flex gap-2 text-sm font-medium hover:bg-darkocean cursor-pointer rounded transition-all p-2" onClick={() => setModal({show: true, type: "search"})}>
                            <Search/> 
                            <span>Search users</span>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 max-md:w-full flex justify-center flex-col gap-5">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
            {modal.show &&
                <div className="fixed w-full min-h-screen bg-black bg-opacity-30 top-0 left-0 flex justify-center items-center transition-all animate-fade">
                    <main className="w-4/12 max-md:w-full bg-darkocean p-4 rounded">
                        <header className="flex justify-between">
                            <h5 className="font-medium">{modal.type == "create" ? "Create post" : "Search users"}</h5>
                            <span className="text-sm underline cursor-pointer" onClick={() => {setModal({...modal, show: false})}}>Close</span>
                        </header>
                        <hr className="border-midnight mb-8 mt-2"/>
                        {modal.type == "create" ?
                            <>
                            <span className="text-sm font-medium">Post content: </span> 
                            <TextEditor text={post} setText={setPost} maxLen={5000}/>
                            <footer className="mt-4">
                                <button className="bg-rose-500 px-4 py-2 rounded font-medium cursor-pointer hover:bg-rose-600 transition-all float-right">Create</button>
                            </footer>
                            </>
                        :
                            <>
                                <input 
                                    className="w-full bg-midnight outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 text-sm font-medium" 
                                    value={userSearch.text} onChange={(e) => setUserSearch({...userSearch, text: e.target.value})}/>
                                {users.totalPages > 0 && users.users.length > 0 ? (
                                    <div className="flex mt-5 truncate flex-wrap gap-2 mb-5">
                                        {users.users.map((user: User) => (
                                            <UserCard user={user}/>
                                        ))}
                                    </div>
                                ) : <></>}
                                {users.totalPages > 0 ?
                                    <Pagination 
                                        totalPages={users.totalPages} 
                                        currentPage={userSearch.page} 
                                        onChange={(page: number) => {setUserSearch({...userSearch, page: page})}}
                                    /> : 
                                    userSearch.text.length > 0 && 
                                    <span className="text-rose-500 text-sm mt-4 font-medium">Could not find any user with name "{userSearch.text}"</span>
                                }
                            </>
                        }
                    </main>
                </div>
            }
        </main>
    )
}

export default Social;