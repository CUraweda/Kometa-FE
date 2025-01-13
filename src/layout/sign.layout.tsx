import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoColor from "../assets/logo/color.png";

type Props = { children: ReactNode; bg?: string };

function SignLayout({ children, bg }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-full sm:w-1/2 min-h-screen p-10  flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="h-10" src={logoColor} alt="logo-color" />
          </Link>
          <button
            onClick={() => navigate('/')}
            className="text-emeraldGreen text-sm"
          >
            Kembali
          </button>
        </div>
        <div className="mx-auto max-w-md text-center">{children}</div>
        <div className="w-full text-center text-sm text-slate-400">
          <p>© 2025 Kometa All Rights Reserved.</p>
        </div>
      </div>
      <div className="w-1/2 p-5 hidden sm:block">

        <div className="w-full min-h-screen bg-green-500 bg-cover bg-center relative rounded-xl overflow-hidden">
          <img
            src={bg}
            alt="signin-bg"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignLayout;
