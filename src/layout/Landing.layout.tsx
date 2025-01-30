import { Outlet } from "react-router-dom";
import Navbar from "../components/content/navbar.component";

function LandingLayout() {
  return (
    <>
      <div className="w-full min-h-screen relative ">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('../kometa-bg.png')] bg-cover">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LandingLayout;
