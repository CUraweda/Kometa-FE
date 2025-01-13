import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/logo/white";
import { navbarMenu } from "../constant/routers/navbar";
import Container from "../component/container.component";
import { useScrollClick } from "../hooks/useScrollClick";

function Navbar() {
  const navigate = useNavigate();
  const handleRedirect = (path: string) => () => navigate(path);
  const { handleScrollClick } = useScrollClick();

  return (
    <Container id="top">
      <div className=" text-white flex justify-between items-center">
        <div className="w-auto flex items-center gap-12 py-6">
          <NavLink to="/">
            <Logo className="w-32" />
          </NavLink>
          <span className="flex items-center gap-6">
            {navbarMenu.map(({ path, label }) => (
              <a
                key={path}
                href={path}
                onClick={handleScrollClick}
                className="cursor-pointer text-sm font-light"
              >
                {label}
              </a>
            ))}
          </span>
        </div>
        <div className="flex items-center gap-9">
          <button
            onClick={handleRedirect("/signin")}
            className="btn btn-ghost btn-sm hover:bg-transparent tracking-wider font-normal"
          >
            Masuk
          </button>
          <button
            onClick={handleRedirect("/signup")}
            className="bg-white hover:bg-emerald-50 rounded tracking-wide outline-none border-0 btn btn-sm text-emeraldGreen font-light"
          >
            Daftar
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
