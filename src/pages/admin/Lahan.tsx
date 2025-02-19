import CenterLayout from '@/layout/center.layout';

import { AiOutlineExpandAlt } from 'react-icons/ai';
import ModalDetail from '@/components/ui/ModalDetail';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { landApi } from '@/middleware';
import { LandData } from '@/middleware/Utils';
import { listedAdmin } from '@/constant/routers/listed';
import Pagination from '@/components/ui/pagination';

const Lahan = () => {
  const [data, setData] = useState<any>(undefined);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]);

  const getData = async () => {
    const id = searchParams.get('id');
    const filter = `&search=memberId:${id}`;
    const payload = `limit=${itemsPerPage}&page=${currentPage}${id ? filter : ''}`;
    const response = await landApi.getAll(payload);

    if (response.data && response.data.data.items) {
      const filteredItems = response.data.data.items.filter(
        (item: LandData) => item.isAccepted
      );
      setData(filteredItems);
      setTotalItems(response.data.data.total_items);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDetailLahan = (props: any) => {
    const params = new URLSearchParams({
      id: props,
      type: 'lahan',
    });

    navigate(`${listedAdmin.detaillahanBaru}?${params.toString()}`);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };
  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className=" w-full min-h-[calc(100vh-105px)] flex flex-col">
          <span className="text-xl font-bold">Lahan Anggota</span>

          <div className="w-full bg-white mt-5 shadow-md p-2 rounded-md">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Alamat Lahan</th>
                    <th>Luas</th>
                    <th>Kondisi Lahan</th>
                    <th>Kepemilikan</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value: LandData, index: number) => (
                    <tr key={index}>
                      <td>{value.ownerFullName}</td>
                      <td>{value.landAddress}</td>
                      <td>{value.documentWideArea}</td>
                      <td>{value.landCondition}</td>
                      <td>{value.ownershipStatus}</td>
                      <td>
                        {' '}
                        <span
                          className={`badge ${
                            value.status === 'Selesai'
                              ? 'badge-accent'
                              : 'badge-secondary'
                          }`}
                        >
                          {value.status}
                        </span>
                      </td>
                      <td>
                        <div className="w-full flex justify-center">
                          <button
                            className="text-xl btn btn-xs btn-ghost"
                            onClick={() => handleDetailLahan(value.id)}
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

      <ModalDetail id="reject-pendapatan">
        <span>Tolak Pendaftaran</span>
        <div className="w-full mt-3">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Keterangan"
          ></textarea>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button className="btn btn-outline btn-sm">Close</button>
          <button className="btn btn-primary text-white btn-sm">Kirim</button>
        </div>
      </ModalDetail>
    </div>
  );
};

export default Lahan;
