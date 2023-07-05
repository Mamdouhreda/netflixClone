import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logOut } = useAuth();
  //console.log(user.email)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center justify-between p-4 z-[100] absolute w-full">
      <Link to="/">
        <h1 className=" text-red-600 text-4xl font-bold cursor-pointer">
          Netflix
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/Account">
            <button className=" text-white pr-4">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className=" bg-red-600 text-white py-2 px-6 rounded-lg cursor-pointer"
          >
            LogOut
          </button>
        </div>
      ) : (
        <div>
          <Link to="/Login">
            <button className=" text-white pr-4">Sign In</button>
          </Link>
          <Link to="/SignUp">
            <button className=" bg-red-600 text-white py-2 px-6 rounded-lg cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;
