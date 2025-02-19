
import { MdMenuOpen } from "react-icons/md";
import NotificationContent from "../content/notification.content";

function TopBarAdmin() {

  return (
    <div className="w-full flex justify-between items-center py-3 px-5 border-b border-b-gray-200 bg-white shadow-md">
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-sm text-2xl drawer-button lg:hidden">
        <MdMenuOpen />
        </label>
      </div>
      <div className="flex gap-3 ml-auto">
      <NotificationContent/>
        <div
          // onClick={() => navigate(listedUser.profile)}
          className="avatar ml-5 cursor-pointer"
        >
          <div className="w-10 rounded-lg">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBarAdmin;
