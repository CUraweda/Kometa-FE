import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/logo/white";
import LogoColor from "../../assets/logo/color.png";
import { navbarMenu } from "../../constant/routers/navbar";
import Container from "../../component/content/container.component";
import { useScrollClick } from "../../hooks/useScrollClick";
import { TfiViewList } from "react-icons/tfi";
import { RiCloseLargeFill } from "react-icons/ri";
import { listed } from "../../constant/routers/listed";

function Navbar() {
  const navigate = useNavigate();
  const handleRedirect = (path: string) => () => navigate(path);
  const { handleScrollClick } = useScrollClick();

  return (
    <Container id="top">
      <div className="navbar p-5 w-full">
        <div className="navbar-start">
          <div></div>
          <NavLink to="/">
            <Logo className="w-32" />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {navbarMenu.map(({ path, label }, index) => (
              <li key={`${path}-${index}`}>
                <a
                  key={path}
                  href={path}
                  onClick={handleScrollClick}
                  className="cursor-pointer text-sm font-light focus:text-white bg-transparent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end ">
          <div className="lg:hidden">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost text-white text-xl drawer-button"
            >
              <TfiViewList />
            </label>
          </div>
          <div className=" items-center gap-2 sm:flex hidden">
            <button
              onClick={handleRedirect(listed.signin)}
              style={{ background: "transparent" }}
              className="btn btn-outline btn-sm sm:btn-md tracking-wider text-white font-bold hover:border-transparent"
            >
              Masuk
            </button>
            <button
              onClick={handleRedirect(listed.signup)}
              className="btn btn-sm sm:btn-md text-emeraldGreen font-bold"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>

      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <div className="w-full flex justify-between">
              <NavLink to="/">
                <img src={LogoColor} className="w-32" loading="eager" />
              </NavLink>
              <label
                htmlFor="my-drawer"
                className="text-2xl btn btn-ghost btn-sm"
              >
                <RiCloseLargeFill />
              </label>
            </div>
            <div className="w-full flex justify-between mt-5 gap-1 mb-8">
              <button
                onClick={handleRedirect("/signin")}
                className="btn w-1/2 btn-outline bg-emeraldGreen btn-sm sm:btn-md hover:bg-transparent tracking-wider  text-white font-bold"
              >
                Masuk
              </button>
              <button
                onClick={handleRedirect("/signup")}
                className="btn w-1/2 btn-sm sm:btn-md text-emeraldGreen font-bold"
              >
                Daftar
              </button>
            </div>
            {navbarMenu.map(({ path, label }, index) => (
              <li key={`${path}-${index}`}>
                <a
                  key={path}
                  href={path}
                  onClick={handleScrollClick}
                  className="cursor-pointer text-sm font-light"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
