import { useLocation, useNavigate } from "react-router-dom";
import { Area, Bell } from "../../assets/icon";
import { listedUser } from "../../constant/routers/listed";
import IconMap from "../../assets/icon/iconMap.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import NotificationContent from "../content/notification.content";
import { MdMenuOpen } from "react-icons/md";

function TopBarAdmin() {
  const navigate = useNavigate();
  const isProfile = useLocation().pathname === `/${listedUser.profile}`;

  return (
    <div className="w-full flex justify-between items-center py-3 px-5 border-b border-b-gray-200 bg-white shadow-md">
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-sm text-2xl drawer-button lg:hidden">
        <MdMenuOpen />
        </label>
      </div>
      <div className="flex gap-3 ml-auto">
        <Popover>
          <PopoverTrigger>
            <button className="group w-10 rounded-lg bg-gray-50 flex justify-center items-center hover:bg-emerald-50">
              <Bell className="h-8 group-hover:fill-emerald-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent><NotificationContent /></PopoverContent>
        </Popover>
        <button className="group w-10 rounded-lg bg-gray-50 flex justify-center items-center hover:bg-emerald-50">
          <Area className="h-8 group-hover:fill-emerald-600" />
        </button>
        <div
          onClick={() => navigate(listedUser.profile)}
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

export default TopBarAdmin;
