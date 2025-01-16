import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = { className?: string; children: ReactNode };

function CenterLayout({ className, children }: Props) {
  return (
    <div
      className={twMerge(
        "min-h-screen flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export default CenterLayout;
