import { Outlet } from "react-router-dom";
import Navbar from "./navbar.component";

function Layout() {
  return (
    <div className="h-[810px] bg-kometa min-h-screen bg-no-repeat">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
