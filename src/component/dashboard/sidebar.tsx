import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "../../assets/icon";
import logo from "../../assets/logo/color.png";
import { sidebarList } from "../../constant/routers/sidebar";
import { sidebarListAdmin } from "../../constant/routers/sidebarAdmin";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<boolean>(true)
  const data = admin ? sidebarListAdmin : sidebarList

  return (
    <div className="w-64 flex flex-col justify-between min-h-screen p-8 border-r border-r-gray-200 bg-white">
      <div className="space-y-12">
        <img className="h-8" src={logo} alt="logo-kometa" />
        <ul className="space-y-3">
          {data.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:text-emeraldGreen ${
                  isActive ? "text-emeraldGreen " : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? "fill-emeraldGreen"
                        : "group-hover:fill-emeraldGreen"
                    }`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </div>
      <button
        onClick={() => navigate("/")}
        className="flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:text-red-700"
      >
        <Logout className="w-4 h-4" />
        <span>Keluar</span>
      </button>
    </div>
  );
}

export default Sidebar;
