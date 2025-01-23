import { ReactNode, useState } from "react";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  defaultCollapse?: boolean;
};

function Collapsible({ id, title, children, defaultCollapse = false }: Props) {
  const [active, setActive] = useState(() => defaultCollapse);
  return (
    <div key={id} id={id} className="collapse bg-gray-50 rounded-lg px-5">
      <h2
        onClick={() => setActive(!active)}
        className="text-lg font-medium py-3 cursor-pointer"
      >
        {title}
      </h2>
      <div className={active ? "h-auto" : "h-0"}>{children}</div>
    </div>
  );
}

export default Collapsible;
