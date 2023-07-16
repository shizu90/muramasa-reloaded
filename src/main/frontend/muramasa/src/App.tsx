import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Front from "./pages/Front"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Social from "./pages/Social"
import Anime from "./pages/Anime"
import Manga from "./pages/Manga"
import Character from "./pages/Character"
import SearchAnime from "./pages/search/SearchAnime"
import SearchManga from "./pages/search/SearchManga"
import SearchCharacter from "./pages/search/SearchCharacter"
import { Toaster } from "react-hot-toast"
import AuthProvider, { AuthContext } from "./context/AuthContext"
import { useContext } from "react";

function ProtectedRoutes() {
  const authContext = useContext(AuthContext);
  const authObject = authContext?.auth;
  
  return authObject ? <Outlet/> : <Front/>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
          <section className="min-h-screen bg-[#0B1622] py-[12rem] px-2 flex flex-col items-center">
            <Routes>
              <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<Home/>}/>
              </Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<SignUp/>}></Route>
              <Route path="/resetpassword" element={<ForgotPassword/>}></Route>
              <Route path="/social" element={<Social/>}></Route>
              <Route path="/anime" element={<Anime/>}></Route>
              <Route path="/manga" element={<Manga/>}></Route>
              <Route path="/character" element={<Character/>}></Route>
              <Route path="/search/anime" element={<SearchAnime/>}></Route>
              <Route path="/search/manga" element={<SearchManga/>}></Route>
              <Route path="/search/character" element={<SearchCharacter/>}></Route>
            </Routes>
            <Toaster position={"top-center"} gutter={4}/>
          </section>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
