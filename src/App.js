import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login'
import Secret from './pages/Secret'
import Register from './pages/Register'
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from './pages/Forget-password';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/register" element={<Register></Register>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/" element={<Secret></Secret>}></Route>
          <Route exact path="/forget-password" element={<ForgetPassword></ForgetPassword>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

