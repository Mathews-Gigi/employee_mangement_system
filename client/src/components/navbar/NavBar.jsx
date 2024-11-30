import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context/authContext";
import SideBar from "../sidebar/SideBar";

function NavBar() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col h-fit">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        {user ? (
          <>
            <SideBar />
            <div className="flex flex-1 justify-start pl-5 align-middle">
              <Link to={"/"} className="flex items-center">
                <TrendingUp className="h-8 w-8 mr-4" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to={"/"} className="flex items-center">
              <TrendingUp className="h-8 w-8 mr-4" />
            </Link>
            {!user && <p>Register</p>}
          </>
        )}
      </header>
    </div>
  );
}

export default NavBar;
