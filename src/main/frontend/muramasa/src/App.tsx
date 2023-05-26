import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <section className="min-h-screen bg-[#0B1622] py-12 px-4 flex flex-col justify-center items-center mb-12">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </section>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
