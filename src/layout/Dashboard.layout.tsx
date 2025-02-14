import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar";
import TopBar from "../components/dashboard/topbar";
import { authUser } from "@/middleware/Rest";
import Swal from "sweetalert2";
import { listedUser } from "@/constant/routers/listed";
import { useEffect, useState } from "react";
import { User } from "@/middleware/Utils";
import { dataMember } from "@/middleware";

function DashboardLayout() {
  const location = useLocation().pathname.split("/").length > 2;
  const navigate = useNavigate();
  const [data, setData] = useState<User>()
  const [images, setImages] = useState<{ index: number; src: string }[]>([]);

    const getDataUser = async () => {
      try {
        const { data } = await authUser.profil();
        setData(data.data)
        loadImages(data.data.MemberFile)
      } catch (error) {
        Swal.fire({
          title: 'Token Expired',
          text: 'Sesi Anda berakhir Silakan login kembali',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#0E8388',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Back to Home',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(listedUser.signin);
          }
        });
      }
    };
    const loadImages = async (props: any) => {
      const allowedFilePaths = { profile: true}; 
      const image = await dataMember.loadImage(props, allowedFilePaths)
      setImages(image ?? []);
    };
    useEffect(() => {
      getDataUser();
    }, []);
   
  return (
    <>
      <div className=" lg:grid">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
          
            <div className="w-full top-0 sticky z-50">
            
            <TopBar profileImageUrl={images[0]?.src ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} userName={data?.fullName}/>
            </div>
            <div className="min-h-[calc(100vh-105px)] py-5 px-7 w-full z-0">
              {location ? <Breadcrumbs /> : null}
              <Outlet />
            </div>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
