import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Front from "./pages/Front"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Social from "./pages/Social"

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <section className="min-h-screen bg-[#0B1622] py-[12rem] px-4 flex flex-col items-center mb-12">
        <Routes>
          <Route path="/" element={<Front/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/resetpassword" element={<ForgotPassword/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/social" element={<Social/>}></Route>
        </Routes>
      </section>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
