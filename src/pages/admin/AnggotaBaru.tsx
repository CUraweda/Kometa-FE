import CenterLayout from '@/layout/center.layout';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import ModalDetail, { openModal } from '@/components/ui/ModalDetail';
import { useEffect, useState } from 'react';
import { Member } from '@/middleware/Utils';
import { memberRest } from '@/middleware';
import { formatDate } from '@/utils/date';
import { useNavigate } from 'react-router-dom';
import { listedAdmin, listedUser } from '@/constant/routers/listed';
import Pagination from '@/components/ui/pagination';
import { IoSearchOutline } from 'react-icons/io5';
import PaymentHistory from './PaymentHistory';

const AnggotaBaru = () => {
  const [data, setData] = useState<any>(undefined);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [currentPage, search, itemsPerPage]);

  const getData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}&search=fullName:${search}`;
    const response = await memberRest.getAll(payload);

    if (response.data && response.data.data.items) {
      const filteredItems = response.data.data.items.filter(
        (item: Member) => !item.isVerified
      );
      setTotalItems(response.data.data.total_items);
      setData(filteredItems);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleDetailAnggota = (props: string) => {
    const params = new URLSearchParams({
      id: props,
      type: 'new-member',
    });

    navigate(`${listedAdmin.DetailAnggotaBaru}?${params.toString()}`);
  };
  const handleNewAnggota = () => {
    const params = new URLSearchParams({
      type: 'register-admin',
    });

    navigate(`${listedUser.registerMember}?${params.toString()}`);
  };

  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className=" w-full min-h-[calc(100vh-105px)] flex flex-col">
          <span className="text-xl font-bold">Anggota Baru Kometa</span>
          <div className="mt-5 w-full flex justify-end gap-3">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Nama Anggota"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoSearchOutline />
            </label>
            <button className='btn btn-ghost bg-emeraldGreen text-white' onClick={handleNewAnggota}>Tambah</button>
          </div>

          <div className="w-full bg-white mt-5 shadow-md p-2 rounded-md">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>Tanggal Pendaftaran</th>
                    <th>Nama</th>
                    <th>Nomor Whatsapp</th>
                    <th>Email</th>
                    <th>Pembayaran</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value: Member, index: number) => (
                    <tr key={index}>
                      <td>{formatDate(value.createdAt)}</td>

                      <td>{value.fullName}</td>
                      <td>{value.user.phoneWA}</td>
                      <td>{value.user.email}</td>
                      <td>{value.registrationPaymentMethod}</td>
                      <td>
                        <span
                          className={`p-1 rounded-md font-bold ${
                            value.registrationIsPaid
                              ? 'bg-green-300 text-green-800'
                              : 'bg-red-300 text-red-800'
                          }`}
                        >
                          {value.registrationIsPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td>
                        <div className="w-full flex justify-start">
                          <button
                            className="text-xl btn btn-xs btn-ghost"
                            onClick={() => handleDetailAnggota(value.id)}
                          >
                            <AiOutlineExpandAlt />
                          </button>
                         
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full mt-5 flex justify-end">
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </div>
      </CenterLayout>

    </div>
  );
};

export default AnggotaBaru;
