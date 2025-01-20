import { Outlet } from "react-router-dom";
import Sidebar from "../component/dashboard/sidebar";
import TopBar from "../component/dashboard/topbar";

function DashboardLayout() {
  return (
    <>
      <div className="hidden lg:grid">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <div className="w-full top-0 sticky z-10">

            <TopBar />
            </div>
            <div className="py-5 px-7 w-full">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
