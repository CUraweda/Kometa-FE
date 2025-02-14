import { listedUser } from '@/constant/routers/listed';
import { MdMenuOpen } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function TopBar({
  profileImageUrl,
  userName,
}: {
  profileImageUrl: string;
  userName?: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center py-3 px-5 border-b border-b-gray-200 bg-white shadow-md">
      <div className="flex gap-2 justify-center items-center">
        <div className="flex gap-2 justify-center items-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost btn-sm text-2xl drawer-button lg:hidden"
          >
            <MdMenuOpen />
          </label>
        </div>
        {userName && <h3>Hello, {userName}</h3>}
      </div>
      <div className="flex gap-3 ml-auto">
        {/* <Popover>
          <PopoverTrigger>
            <button className="group w-10 rounded-lg bg-gray-50 flex justify-center items-center hover:bg-emerald-50">
              <Bell className="h-8 group-hover:fill-emerald-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent><NotificationContent /></PopoverContent>
        </Popover> */}

        <div
          onClick={() => navigate(listedUser.profile)}
          className="avatar ml-5 cursor-pointer"
        >
          <div className="w-10 rounded-lg">
            <img
              src={
                profileImageUrl ??
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
