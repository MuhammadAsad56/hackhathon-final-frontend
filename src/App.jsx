import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Cookies from "js-cookie";
import SignUpPage from "./pages/auth/signup";
import LoginPage from "./pages/auth/login";
import HomePage from "./pages/homepage/HomePage";
import { AuthContext } from "./context/AuthContext";
import NoDataFound from "./components/No-data-found";
import { ToastContainer } from "react-toastify";
import LandingPage from "./components/LandingPage";
import LoanCalculator from "./components/LoanCalculator";
import Dashboard from "./components/Dahsboard";
function App() {
   const { user } = useContext(AuthContext);  

  return (
    <>
      <ToastContainer />
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/calculator" element={<LoanCalculator />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NoDataFound />} />
      {/* <Route path="/admin" element={<Admin />} />
      <Route path="/user" element={user ? <Students /> : <Navigate to={"/"} />} />
      <Route path="/teacher" element={<Teacher />} /> */}
    </Routes>
      </> 
  );
}

export default App;
