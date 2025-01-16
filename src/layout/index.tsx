import { Outlet } from "react-router-dom";
import Navbar from "./navbar.component";
<<<<<<< Updated upstream
=======
import bg from "../assets/content/kometa-bg.png"
>>>>>>> Stashed changes

function Layout() {
  return (
    <>
<<<<<<< Updated upstream


      <div className="w-full min-h-screen relative ">
          <div className="absolute top-0 left-0 w-full h-full bg-kometa bg-cover" >

            <Navbar />
            <Outlet />
          </div>
        
=======
      <div className="w-full min-h-screen relative ">
        <img src={ bg} alt="" className="absolute top-0 left-0 w-full h-full"/>
        <div className="absolute top-0 left-0 w-full h-full" >
          <Navbar />
          <Outlet />

        </div>

>>>>>>> Stashed changes

      </div>

    </>
  );
}

export default Layout;
