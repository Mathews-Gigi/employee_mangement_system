import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt, FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard, MdGroup } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

import { useAuth } from "../../context/auth_context/authContext";
import { PiTreeView } from "react-icons/pi";
import { Link } from "react-router-dom";

const menuItems = [
  {
    icons: <MdOutlineDashboard size={30} />,
    label: "Dashboard",
    link: "/admin_dashboard",
  },
  { icons: <MdGroup size={30} />, label: "Employee", link: "/employee" },
  { icons: <PiTreeView size={30} />, label: "Depatment", link: "/department" },
  { icons: <IoLogoBuffer size={30} />, label: "Salary", link: "/salary" },
  { icons: <TbReportSearch size={30} />, label: "Leave", link: "/leave" },
  { icons: <CiSettings size={30} />, label: "Setting", link: "/settings" },
];

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth;

  return (
    <>
      {/* Menu Toggle Icon */}
      <div className="sticky top-2.5 left-4 z-50">
        <button onClick={() => setOpen(!open)}>
          {/* {open ? (
            <MdClose
              size={34}
              className="transition-transform duration-300 transform rotate-0"
            />
          ) : (
            <MdMenu
              size={34}
              className="transition-transform duration-300 transform rotate-180"
            />
          )} */}
          {!open && (
            <MdMenu
              size={34}
              className="transition-transform duration-300 transform rotate-180"
            />
          )}
        </button>
      </div>

      {/* Sidebar */}
      {open && (
        <nav className="fixed top-0 left-0 h-full w-60 bg-white shadow-lg p-4 text-black z-50 transition-transform duration-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <MdClose
              size={34}
              className="cursor-pointer transition-transform duration-300 transform rotate-0"
              onClick={() => setOpen(false)}
            />
          </div>

          <ul>
            {menuItems.map((item, index) => (
              <Link key={index} to={item.link}>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer">
                  <div>{item.icons}</div>
                  <span>{item.label}</span>
                </li>
              </Link>
            ))}
          </ul>
          <div>
            <ul>
              <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <div>
                  <FaUserCircle size={30} />
                </div>
                <span>Profile</span>
              </li>
              <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <div>
                  <AiOutlineLogout size={30} />
                </div>
                <span>Log out</span>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default SideBar;
