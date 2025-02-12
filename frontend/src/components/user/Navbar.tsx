  // import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { logout } from "../../state/lib/User/userSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };
  return (
    <>
      <nav className="flex items-center justify-between p-6 bg-[#F3F4F6]">
        <Link to="/">
          {" "}
          <div className="px-6 py-2 bg-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center">
            Home
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          <span className="text-lg font-medium">Dream</span>
        </div>
        {currentUser ? (
          
            <div onClick={handleLogout} className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer text-center">
              Logout
            </div>

        ) : (
          <Link to="/login">
            {" "}
            <div className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer text-center">
              Sign In
            </div>
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;
