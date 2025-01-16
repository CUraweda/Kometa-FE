import { ReactNode } from "react";

type Props = { title: string; description: string | ReactNode };

function Header({ title, description }: Props) {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-1 text-slate-600">{title}</h2>
      <p className="text-slate-500 whitespace-pre-line">{description}</p>
    </>
  );
}

export default Header;
