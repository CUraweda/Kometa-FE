import { ReactNode } from "react";
import logo from "../assets/logo/color.png";

type Props = { children: ReactNode };

function PaymentLayout({ children }: Props) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex justify-start p-8">
        <img className="h-10" src={logo} alt="logo-kometa" />
      </div>
      {children}
      <p className="text-xs text-slate-500 text-center mt-auto">
        © 2025 Kometa All Rights Reserved.
      </p>
    </div>
  );
}


export default PaymentLayout;
