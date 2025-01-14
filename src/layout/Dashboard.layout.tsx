import { Outlet } from "react-router-dom";
import Sidebar from "../component/dashboard/sidebar";
import TopBar from "../component/dashboard/topbar";

function DashboardLayout() {
  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="py-5 px-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
