import { Outlet } from "react-router-dom";
import Navbar from "./navbar.component";

function Layout() {
  return (
    <>


      <div className="w-full min-h-screen relative ">
          <div className="absolute top-0 left-0 w-full h-full bg-kometa bg-cover" >

            <Navbar />
            <Outlet />
          </div>
        

      </div>

    </>
  );
}

export default Layout;
