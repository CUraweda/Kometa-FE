import { useLocation, useNavigate } from "react-router-dom";
import { Area, Bell } from "../../assets/icon";
import { listed } from "../../constant/routers/listed";
import IconMap from "../../assets/icon/iconMap.png";

function TopBar() {
  const navigate = useNavigate();
  const isProfile = useLocation().pathname === `/${listed.profile}`;

  return (
    <div className="w-full flex justify-between items-center py-3 px-5 border-b border-b-gray-200">
      <div className="flex gap-2 justify-center items-center">
        <img src={IconMap} alt="logo" className="lg:hidden" />
        {isProfile ? null : <h3>Hello, John Smith</h3>}
      </div>
      <div className="flex gap-3 ml-auto">
        <button className="group w-10 rounded-lg bg-gray-50 flex justify-center items-center hover:bg-emerald-50">
          <Bell className="h-8 group-hover:fill-emerald-600" />
        </button>
        <button className="group w-10 rounded-lg bg-gray-50 flex justify-center items-center hover:bg-emerald-50">
          <Area className="h-8 group-hover:fill-emerald-600" />
        </button>
        <div
          onClick={() => navigate(listed.profile)}
          className="avatar ml-5 cursor-pointer"
        >
          <div className="w-10 rounded-lg">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
