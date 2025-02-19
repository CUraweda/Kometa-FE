import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import image from '@/assets/gif/Notification.gif';
import image2 from '@/assets/gif/read.gif';
import { useEffect, useState } from 'react';
import { notifRest } from '@/middleware/Rest';
import { NotificationUser } from '@/middleware/Utils';
import { formatDate } from '@/utils/date';
import { useNavigate } from 'react-router-dom';
import { listedAdmin, listedUser } from '@/constant/routers/listed';
import useAuthStore from '@/store/auth.store';

const NotificationContent = () => {
  const [data, setData] = useState<NotificationUser[]>([]);
  const { role } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } =
      role === 'ADMIN'
        ? await notifRest.notifAdmin()
        : await notifRest.notifUser();
    setData(data.data);
  };

  const viewDetailNotif = (type: string, idMember: string | null) => {
    const params = new URLSearchParams({
      id: idMember ?? '',
      type: type,
    });

    switch (type) {
      case 'payment':
        navigate(listedUser.finance);
        break;
      case 'new-member':
        idMember
          ? navigate(`${listedAdmin.DetailAnggotaBaru}?${params.toString()}`)
          : navigate(listedAdmin.adminAnggota);
        break;
    }
  };

  const readAll = async () => {
    await notifRest.readAll();
    getData();
  };
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-start">
            <button className="btn btn-sm btn-circle hover:bg-emerald-50">
              {data?.length > 0 ? (
                <img src={image} alt="notification gif" />
              ) : (
                <Bell className="h-8 group-hover:fill-emerald-600" />
              )}
            </button>
            {data?.length > 0 && (
              <div className="badge badge-secondary badge-xs">
                {data.length}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full">
            {data?.length > 0 && (
              <>
                <span className="mb-10">Pemberitahuan</span>
                <hr className="mt-3" />
                <div className="my-2 ">
                  <button
                    className="bg-emeraldGreen text-white text-sm btn btn-xs"
                    onClick={readAll}
                  >
                    Tandai Baca Semuanya
                  </button>
                </div>

                <div className="space-y-2 max-h-96 h-96 overflow-auto">
                  {data.map((notif) => (
                    <div
                      key={notif.notificationId}
                      className="flex flex-col bg-white p-4 rounded-md shadow-sm"
                    >
                      <div className="font-semibold">
                        {notif.Notification.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {notif.Notification.message}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(notif.Notification.createdAt)}
                      </div>
                      <div className="mt-2 flex justify-between">
                        <button
                          className="bg-blue-500 text-white text-sm btn btn-xs"
                          onClick={() =>
                            viewDetailNotif(
                              notif.Notification.subTopic,
                              notif.Notification.directPath
                            )
                          }
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {data?.length <= 0 && (
              <div className="w-full h-96 flex justify-center items-center flex-col gap-4">
                <img src={image2} alt="bell" className="w-24" />
                <p>Tidak Ada Notifikasi Terbaru</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationContent;
