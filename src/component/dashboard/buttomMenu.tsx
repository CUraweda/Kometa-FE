import { sidebarList } from "../../constant/routers/sidebar";
import { NavLink } from "react-router-dom";

const ButtomMenu = () => {
    return (
        <>
            <hr />
            <div role="tablist" className="tabs tabs-boxed h-20 flex bg-white shadow-md justify-between px-3 gap-2 items-center">
                {sidebarList.map(({ label, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `group flex  items-center cursor-pointer rounded-lg hover:text-emeraldGreen ${isActive ? "text-emeraldGreen p-2" : ""
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex flex-col justify-center items-center text-wrap">
                                <Icon
                                    className={`w-7 h-8 ${isActive
                                        ? "fill-emeraldGreen"
                                        : "group-hover:fill-emeraldGreen"
                                        }`}
                                />
                                <span className="text-xs">{label}</span>
                            </div>
                        )}
                    </NavLink>
                ))}

            </div>
        </>
    )
}

export default ButtomMenu