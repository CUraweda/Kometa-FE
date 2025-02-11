import CenterLayout from '@/layout/center.layout';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import ModalDetail, {
  closeModal,
  openModal,
} from '@/components/ui/ModalDetail';
import { useEffect, useState } from 'react';
import { paymentRest } from '@/middleware/Rest';
import {
  Member,
  SavingData,
  Simpanan,
} from '@/middleware/Utils';
import { formatRupiah } from '@/utils/formatRupiah';
import { formatDateTime } from '@/utils/formatDate';
import { useSearchParams } from 'react-router-dom';

import { memberRest, PaymentRest } from '@/middleware';
import Pagination from '@/components/ui/pagination';

const TagihanDetailMember = () => {
  const [billData, setBill] = useState<SavingData[]>([]);
  const [memberData, setMember] = useState<Member[]>([]);
  const [idMember, setIdMember] = useState<Member[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getData();
  }, []);

  const id = searchParams.get('id');

  const getData = async () => {
    const payload = `where=savingRefId:${id}`;
    const { data } = await paymentRest.getBillData(payload);
    setBill(data.data.items);
    setTotalItems(data.data.total_items);
  };

  const getDataMember = async () => {
    openModal('create-saving');
    const payload = `limit=${itemsPerPage}&page=${currentPage}`;
    const response = await memberRest.getAll(payload);

    if (response.data && response.data.data.items) {
      const filteredItems = response.data.data.items.filter(
        (item: Member) => item.isVerified
      );
      setMember(filteredItems);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const handleAddBillMember = async () => {
    const data: Simpanan[] = []
    closeModal('create-saving')
    const member = idMember.map((value : Member) => {
      const payload: Simpanan = {
        memberId : value.id,
        savingRefId: id ?? '',
        status: 'Belum Dibayar',
        isPaymentSuccess: false
      }
      data.push(payload)
    })
    
    await Promise.all(member)
    await PaymentRest.createBillByReference(data)
    getData()
  }


  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className=" w-full min-h-[calc(100vh-105px)] flex flex-col">
          <span className="text-xl">Detail Tagihan</span>

          <div className="mt-5 w-full flex justify-end gap-3">
            {/* <label className="input input-bordered flex items-center gap-2 ">
              <CiSearch />
              <input type="text" className="grow" placeholder="Search" />
            </label> */}
            <button
              className="btn btn-ghost bg-emeraldGreen text-white"
              onClick={getDataMember}
            >
              Tambah
            </button>
          </div>

          <div className="w-full bg-white mt-5 shadow-md p-2 rounded-md">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Member</th>
                    <th>Nama Tagihan</th>
                    <th>Status</th>
                    <th>Total Biaya</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billData.map((bill: SavingData, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bill.member.fullName}</td>
                      <td>{bill.SavingReference.description}</td>
                      <td>{bill.status}</td>

                      <td>{formatRupiah(bill.totalPayment)}</td>
                      <td>
                        <div className="w-full flex justify-start">
                          <button
                            className="text-xl btn btn-xs btn-ghost"
                            onClick={() => openModal('detail-pendapatan')}
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
              />
            </div>
          </div>
        </div>
      </CenterLayout>

      <ModalDetail id="create-saving" width="w-11/12 max-w-5xl">
        <span className="font-bold">Tambah Tagihan Member</span>
        <div className="flex w-full flex-col gap-2 mt-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIdMember(memberData);
                        } else {
                          setIdMember([]);
                        }
                      }}
                    />
                  </th>
                  <th>Name</th>
                  <th>Tanggal Registrasi</th>
                  <th>Nomor Handphone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {memberData.map((data: Member, index: number) => (
                  <tr key={index}>
                    <th>
                      <input
                        type="checkbox"
                        checked={idMember.some(
                          (member) => member.id === data.id
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setIdMember([...idMember, data]);
                          } else {
                            setIdMember(
                              idMember.filter((member) => member.id !== data.id)
                            );
                          }
                        }}
                        className="checkbox"
                      />
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold mb-2">{data.fullName}</div>
                          <span
                            style={{
                              backgroundColor:
                                data.membershipType.backgroundColor,
                              color: data.membershipType.foregroundColor,
                              padding: '5px',
                              borderRadius: '5px',
                            }}
                          >
                            {data?.membershipType.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{formatDateTime(data.createdAt)}</td>
                    <td>{data.user.phoneWA}</td>
                    <td>{data.user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => closeModal('create-saving')}
          >
            Close
          </button>
          <button
            className={`btn btn-ghost bg-emeraldGreen text-white btn-sm `}
            onClick={handleAddBillMember}
          >
            Simpan
          </button>
        </div>
      </ModalDetail>
    </div>
  );
};

export default TagihanDetailMember;
