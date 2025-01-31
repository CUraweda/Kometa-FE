import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar";
import TopBar from "../components/dashboard/topbar";

function DashboardLayout() {
  return (
    <>
      <div className=" lg:grid">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
          
            <div className="w-full top-0 sticky z-50">
            
            <TopBar />
            </div>
            <div className="py-5 px-7 w-full z-0">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side z-50">
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
