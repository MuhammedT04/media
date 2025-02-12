// import "./App.css";
import Home from "./components/user/Home";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

function App() {
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={!currentUser?<Signup />:<Navigate to={'/'} replace={true}/>} />
          <Route path="/login" element={!currentUser?<Login />:<Navigate to={'/'} replace={true}/>} />
        </Route>
      </Routes>
    </>
  );
}

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
