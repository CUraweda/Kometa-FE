import CenterLayout from '@/layout/center.layout';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import ModalDetail, {
  closeModal,
  openModal,
} from '@/components/ui/ModalDetail';
import { useEffect, useState } from 'react';
import { paymentRest } from '@/middleware/Rest';
import { BillItem, createBillData } from '@/middleware/Utils';
import { formatRupiah } from '@/utils/formatRupiah';
import { formatDateTime } from '@/utils/formatDate';
import Input from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { billSchame } from '@/useForm/billData';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import getErrorMessage from '@/utils/apiHelper';
import { useNavigate } from 'react-router-dom';
import { listedAdmin } from '@/constant/routers/listed';
import { CiMenuKebab } from 'react-icons/ci';
import Pagination from '@/components/ui/pagination';

const Tagihan = () => {
  const [billData, setBill] = useState<BillItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<createBillData>({
    defaultValues: {
      description: '',
      paymentDueDate: '',
      totalPayment: 0,
      createPayment: false,
    },
    mode: 'onChange',
    resolver: yupResolver(billSchame),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}`;
    const { data } = await paymentRest.getBillReference(payload);
    setBill(data.data.items);
    setTotalItems(data.data.total_items);
  };

  const onSubmit: SubmitHandler<createBillData> = async (value) => {
    closeModal('create-bill');
    try {
      await paymentRest.generateBillReference(value);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'berhasil menambahkan data',
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      getData();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigateDetail = (id: string) => {
    const params = new URLSearchParams({
      id: id,
    });

    navigate(`${listedAdmin.tagihanDetail}?${params.toString()}`);
  };

  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className=" w-full min-h-[calc(100vh-105px)] flex flex-col">
          <span className="text-xl">Tagihan</span>

          <div className="mt-5 w-full flex justify-end gap-3">
            {/* <label className="input input-bordered flex items-center gap-2 ">
              <CiSearch />
              <input type="text" className="grow" placeholder="Search" />
            </label> */}
            <button
              className="btn btn-ghost bg-emeraldGreen text-white"
              onClick={() => openModal('create-bill')}
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
                    <th>Keterangan</th>
                    <th>Jatuh Tempo</th>
                    <th>Total Biaya</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billData.map((bill: BillItem, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bill.description}</td>
                      <td>{formatDateTime(bill.paymentDueDate)}</td>

                      <td>{formatRupiah(bill.totalPayment)}</td>
                      <td>
                        <div className="w-full flex justify-start">
                          <button
                            className="text-xl btn btn-xs btn-ghost"
                            onClick={() => handleNavigateDetail(bill.id)}
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

      <ModalDetail id="create-bill">
        <span className="font-bold">Tambah Tagihan Anggota</span>
        <div className="flex w-full flex-col gap-2 mt-5">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="">Detail Tagihan</label>
            <Input
              type="text"
              error={errors?.description}
              placeholder="tagihan bulan januari"
              className="w-full"
              {...register('description')}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="">Nominal</label>
            <Input
              type="number"
              error={errors?.totalPayment}
              placeholder="100000"
              className="w-full"
              {...register('totalPayment')}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="">Tanggal Jatuh Tempo</label>
            <Input
              type="date"
              error={errors?.paymentDueDate}
              placeholder="100000"
              className="w-full"
              {...register('paymentDueDate')}
            />
          </div>
          <div className="flex w-full gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              {...register('createPayment')}
              checked={watch('createPayment')}
              onChange={(e) => setValue('createPayment', e.target.checked)}
            />
            <label htmlFor="">Terapkan Untuk Semua Anggota Terverifikasi</label>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => closeModal('create-bill')}
          >
            Close
          </button>
          <button
            className="btn btn-ghost bg-emeraldGreen text-white btn-sm"
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </button>
        </div>
      </ModalDetail>
    </div>
  );
};

export default Tagihan;
