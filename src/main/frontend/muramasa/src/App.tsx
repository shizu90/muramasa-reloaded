import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <div className="absolute w-full h-[32rem] top-20 bg-wallpaper z-0"></div>
      <section className="min-h-screen bg-[#0B1622] py-12 px-4 flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </section>
    </BrowserRouter>
  )
}

export default App
