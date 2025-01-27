import { capitalize } from "@/utils/string";
import { NavLink, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const pathname = useLocation().pathname;
  const arrPath = pathname.slice(1, pathname.length).split("/");
  return (
    <div className="breadcrumbs text-sm w-full">
      <ul>
        {arrPath.map((item, index) => (
          <li key={item}>
            {index < arrPath.length - 1 ? (
              <NavLink to={`/${item}`}>{capitalize(item, 0)}</NavLink>
            ) : (
              <a className="font-semibold">{capitalize(item, 0)}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
