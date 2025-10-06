import {  SignUp } from "./pages/SignUp"
import { DashBoard } from "./pages/DashBoard"
import { SignIn } from "./pages/SignIn"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"


function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/dashboard" element={<DashBoard/>}/>
  </Routes>
  </BrowserRouter>
  
}

export default App
