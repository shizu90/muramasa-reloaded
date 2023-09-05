import { useEffect, useState } from "react";
import muramasa_api from "../api/muramasa/routes";
import useAuth from "../hooks/useAuth";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import UserCard from "../components/UserCard";

interface UserSearch {
    text: string,
    page: number
}

interface UsersData {
    users: Array<User>,
    totalPages: number
}

function Social() {
    const auth = useAuth();
    const [userSearch, setUserSearch] = useState<UserSearch>({text: "", page: 1});
    const [users, setUsers] = useState<UsersData>({users: [], totalPages: 0});

    useEffect(() => {
        if(userSearch.text.length > 0) {
            muramasa_api.user.search(userSearch.text, userSearch.page-1)
            .then((res) => setUsers({users: res.data.content, totalPages: res.data.totalPages}))
            .catch((err) => console.log(err));
        }
    }, [userSearch]);

    return (
        <main className="w-8/12 max-sm:w-full max-md:w-10/12 max-lg:w-11/12 justify-between flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col max-xl:flex-col gap-12 text-slate-50 py-32">
            <div className="flex flex-col gap-5 w-[43%]">
                <div className="flex flex-col p-4 h-[480px]">
                    <h5 className="font-medium mb-5">Search users</h5>
                    <input className="w-full bg-darkocean outline-none px-4 py-2 rounded caret-slate-500 text-slate-400 text-sm font-medium" value={userSearch.text} onChange={(e) => setUserSearch({...userSearch, text: e.target.value})}/>
                    {users.totalPages > 0 && users.users.length > 0 ? (
                        <div className="flex mt-5 truncate flex-wrap gap-2 mb-5">
                            {users.users.map((user: User) => (
                                <UserCard user={user}/>
                            ))}
                        </div>
                    ) : <></>}

                    {users.totalPages > 0 &&
                        <Pagination 
                            totalPages={users.totalPages} 
                            currentPage={userSearch.page} 
                            onChange={(page: number) => {setUserSearch({...userSearch, page: page})}}
                        />
                    }
                </div>
                <div className="flex flex-col">
                    <h5 className="font-medium my-5">Recent following posts</h5>
                </div>
            </div>
            <div className="w-6/12">
                <div className="flex gap-2 items-center mb-2">
                    <h5 className="font-medium">Recent posts</h5>
                    {auth.isAuthenticated && <button className="font-medium hover:bg-slate-800 px-2 rounded py-1">+ Create post</button>}
                </div>
                <div className="flex flex-col gap-5">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </main>
    )
}

export default Social;