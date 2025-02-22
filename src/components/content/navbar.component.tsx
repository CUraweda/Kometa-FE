import { RiCloseLargeFill } from "react-icons/ri";
import { TfiViewList } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import LogoColor from "../../assets/logo/color.png";
import { Logo } from "../../assets/logo/white";
import Container from "../../components/content/container.component";
import { listedUser } from "../../constant/routers/listed";
import { navbarMenu } from "../../constant/routers/navbar";
import { useScrollClick } from "../../hooks/useScrollClick";

function Navbar() {
  const navigate = useNavigate();
  const { handleScrollClick } = useScrollClick();

  const handleSignIn = () => {
    
    navigate(listedUser.signin);
  };

  const handleSignUp = () => {
    navigate(listedUser.signup);
  };

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
              onClick={handleSignIn}
              style={{ background: "transparent" }}
              className="btn btn-sm sm:btn-md tracking-wider text-white"
            >
              Masuk
            </button>
            <button
              onClick={handleSignUp}
              className="btn btn-sm sm:btn-md btn-primary"
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
                onClick={handleSignIn}
                className="btn w-1/2 btn-outline btn-sm sm:btn-md hover:bg-transparent tracking-wider"
              >
                Masuk
              </button>
              <button
                onClick={handleSignUp}
                className="btn btn-primary w-1/2 btn-sm sm:btn-md"
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
