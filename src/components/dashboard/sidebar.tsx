import { NavLink, useNavigate } from 'react-router-dom';
import { Logout } from '../../assets/icon';
import logo from '../../assets/logo/color.png';
import {
  sidebarList,
  sidebarListUnverif,
} from '../../constant/routers/sidebar';
import { sidebarListAdmin } from '../../constant/routers/sidebarAdmin';
import useAuthStore from '../../store/auth.store';
import { useEffect, useState } from 'react';
import { memberRest } from '@/middleware';
import { MemberData } from '@/middleware/Utils';
import useMemberStore from '@/store/home.store';
import { iconMapping } from '@/components/icons/index';

function Sidebar() {
  const navigate = useNavigate();
  const { role, clearAuth } = useAuthStore();
  const { setMember } = useMemberStore();
  const [data, setData] = useState<any[]>([]);

  const checkData = async () => {
    const response = await memberRest.checkData();

    if (
      typeof response === 'object' &&
      response !== null &&
      'data' in response
    ) {
      const dataRest = response.data as MemberData;
      const isVerif = dataRest.data.isVerified;
      const idMember = dataRest.data.id;

      setMember({ idMember });

      stateSidebar(isVerif);
    } else {
      console.error('Invalid response structure', response);
    }
  };

  useEffect(() => {
    if (role === 'USER') {
      checkData();
    } else {
      setData(sidebarListAdmin);
    }
  }, []);

  const stateSidebar = (props: boolean) => {
    if (props) {
      setData(sidebarList);
    } else {
      setData(sidebarListUnverif);
    }
  };

  return (
    <div className="w-64 flex flex-col justify-between min-h-screen p-8 border-r border-r-gray-200 bg-white">
      <div className="space-y-12">
        <img className="h-8" src={logo} alt="logo-kometa" />
        <ul className="space-y-3">
          {data.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:text-emeraldGreen ${
                  isActive ? 'text-emeraldGreen ' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-4 h-4 ${
                      isActive
                        ? 'fill-emeraldGreen'
                        : 'group-hover:fill-emeraldGreen'
                    }`}
                  >
                    {iconMapping[Icon]}
                  </span>
                 
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          clearAuth(), navigate('/');
        }}
        className="flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:text-red-700"
      >
        <Logout className="w-4 h-4" />
        <span>Keluar</span>
      </button>
    </div>
  );
}

export default Sidebar;
