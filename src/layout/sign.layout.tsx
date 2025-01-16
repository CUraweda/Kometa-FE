import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoColor from "../assets/logo/color.png";
import { RiArrowDropLeftLine } from "react-icons/ri";

type Props = { children: ReactNode; bg?: string; hideBack?: boolean };

function SignLayout({ children, bg, hideBack = false }: Props) {
  const navigate = useNavigate();

  
  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-full sm:w-1/2 min-h-screen p-10  flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              className="h-10"
              src={logoColor}
              alt="logo-color"
              loading="eager"
            />
          </Link>
          {hideBack ? null : (
            <button
              onClick={() => navigate(-1)}
              className="text-emeraldGreen text-sm flex items-center"
            >
              <RiArrowDropLeftLine size={25}/> Kembali
            </button>
          )}
        </div>
        <div className="mx-auto max-w-md text-center">{children}</div>
        <div className="w-full text-center text-sm text-slate-400">
          <p>© 2025 Kometa All Rights Reserved.</p>
        </div>
      </div>
      <div className="w-1/2 hidden sm:block relative min-h-screen">
        <div className="m-10 absolute inset-0 bg-cover bg-center rounded-xl overflow-hidden">
          <img
            src={bg}
            alt="signin-bg"
            className="h-full max-w-1/2 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignLayout;
