import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./app/hooks";
import { authenticated } from "./features/auth/authSlice";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticated());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="profile"
            element={<ProtectedRoute component={Profile} />}
          />
        </Routes>
      </Router>
      <ToastContainer autoClose={4000} />
    </>
  );
}

export default App;
