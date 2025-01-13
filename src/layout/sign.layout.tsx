import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoColor from "../assets/logo/color.png";

type Props = { children: ReactNode; bg?: string };

function SignLayout({ children, bg }: Props) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-10 p-8 min-h-screen">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="h-10" src={logoColor} alt="logo-color" />
          </Link>
          <button
            onClick={() => navigate(-1)}
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
      <img
        className="h-full w-full object-cover rounded-lg overflow-hidden"
        src={
          bg ??
          "https://images.unsplash.com/photo-1609580723017-c611fb82987b?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="signin-bg"
      />
    </div>
  );
}

export default SignLayout;
