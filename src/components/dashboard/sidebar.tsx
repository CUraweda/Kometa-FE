import { NavLink, useNavigate } from 'react-router-dom';
import { Logout } from '../../assets/icon';
import logo from '../../assets/logo/color.png';
import {
  sidebarList,
  sidebarListUnverif,
} from '../../constant/routers/sidebar';
import { sidebarListAdmin } from '../../constant/routers/sidebarAdmin';
import useAuthStore from '../../store/auth.store';
import React, { useEffect, useState } from 'react';
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
    <div className="w-64 flex flex-col justify-between min-h-screen px-2 py-4 border-r border-r-gray-200 bg-white">
      <div className="space-y-12">
        <img className="h-8" src={logo} alt="logo-kometa" />
        <ul className="menu space-y-3">
          {data.map((item: any, index: number) => (
            <React.Fragment key={`menu-` + index}>
              {item.subMenu ? (
                <li className="my-2">
                  <details>
                    <summary>
                      <span className="text-xl">{iconMapping[item.icon]}</span>
                      <a>{item.label}</a>
                    </summary>
                    <ul>
                      {item.subLabel?.map((Item: any, Index: number) => (
                        <NavLink
                          key={Index}
                          to={Item.path}
                          className={({ isActive }) =>
                            `group flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:text-emeraldGreen ${
                              isActive ? 'text-emeraldGreen ' : ''
                            }`
                          }
                        >
                          <li>
                            <span>{Item.label}</span>
                          </li>
                         
                        </NavLink>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <NavLink
                  key={item?.path}
                  to={item?.path}
                  className={({ isActive }) =>
                    `group flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:text-emeraldGreen ${
                      isActive ? 'text-emeraldGreen ' : ''
                    }`
                  }
                >
                    <div className='px-2 flex gap-2'>
                     <span className="text-xl">{iconMapping[item.icon]}</span>
                      <span>{item.label}</span>
                    </div>
                 
                </NavLink>
              )}
            </React.Fragment>
           
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
