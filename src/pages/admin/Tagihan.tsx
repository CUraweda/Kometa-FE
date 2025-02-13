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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listedAdmin } from '@/constant/routers/listed';
import Pagination from '@/components/ui/pagination';
import { CiTrash } from 'react-icons/ci';
import { LuPencilLine } from 'react-icons/lu';

const Tagihan = () => {
  const [billData, setBill] = useState<BillItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [idBill, setIdBill] = useState<string>('');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const type = searchParams.get('id');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    getValues,
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
  }, [currentPage, itemsPerPage]);

  const getData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}`;
    const { data } = await paymentRest.getBillReference(payload);
    setBill(data.data.items);
    setTotalItems(data.data.total_items);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan 1 karena bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0'); // Menambahkan leading zero jika diperlukan

    return `${year}-${month}-${day}`;
  };

  const getDataById = async (id: string) => {
    navigate(`${listedAdmin.tagihan}?id=${id}&type=edit`);
    const { data } = await paymentRest.getBillReferenceById(id);
    setValue('description', data.data.description ?? '');
    setValue('paymentDueDate', formatDate(data.data.paymentDueDate) ?? '');
    setValue('totalPayment', data.data.totalPayment ?? 0);
    setValue('totalPayment', data.data.totalPayment ?? 0);

    openModal('create-bill');
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

  const handleEdit = async () => {
    closeModal('create-bill');
    try {
      const data = {
        description: getValues('description'),
        paymentDueDate: getValues('paymentDueDate'),
        totalPayment: getValues('totalPayment'),
      };
      await paymentRest.updateReferencePayment(data, id);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'berhasil menambahkan data',
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      getData();
      navigate(`${listedAdmin.tagihan}`);
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
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleNavigateDetail = (id: string) => {
    const params = new URLSearchParams({
      id: id,
    });

    navigate(`${listedAdmin.tagihanDetail}?${params.toString()}`);
  };
  const trigerDelete = (id: string) => {
    openModal('delete-bill');
    setIdBill(id);
  };

  const handleDelete = async () => {
    closeModal('delete-bill');
    try {
      await paymentRest.deleteReferenceData(idBill);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your data has been deleted.',
        icon: 'success',
      });
      getData();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
      throw new Error(getErrorMessage(error, 'failed. Please try again.'));
    }
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
                          <button
                            className="text-xl btn btn-xs btn-ghost text-orange-500"
                            onClick={() => getDataById(bill.id)}
                          >
                            <LuPencilLine />
                          </button>
                          <button
                            className="text-xl btn btn-xs btn-ghost text-red-500"
                            onClick={() => trigerDelete(bill.id)}
                          >
                            <CiTrash />
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

      <ModalDetail id="create-bill">
        <span className="font-bold">
          {type ? 'Edit Tagihan Anggota' : 'Tambah Tagihan Anggota'}
        </span>
        <div className="flex w-full flex-col gap-2 mt-5">
          <div className="card border-l-[5px] border-yellow-500 bg-white shadow-md p-5 flex flex-col text-sm">
            <span>Cara Pengisian :</span>
            <p>
              pada bagian{' '}
              <span className="font-semibold italic">Detail Tagihan</span> diisi
              dengan format sebagai berikut
            </p>
            <ul className="list-disc list-outside pl-4">
              <li>
                awali dengan <span className="font-bold">( Simpanan - )</span>{' '}
                untuk tagihan simpanan wajib ( exp : Simpanan - Bulan Januari)
              </li>
              <li>
                awali dengan <span className="font-bold">( Admin - )</span>{' '}
                untuk tagihan biaya Admin ( exp : Admin - Bulan Januari)
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="">Detail Tagihan</label>
            <Input
              type="text"
              error={errors?.description}
              placeholder="Simpanan - Bulan Januari"
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
          {!type && (
            <div className="flex w-full gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                {...register('createPayment')}
                checked={watch('createPayment')}
                onChange={(e) => setValue('createPayment', e.target.checked)}
              />
              <label htmlFor="">
                Terapkan Untuk Semua Anggota Terverifikasi
              </label>
            </div>
          )}
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => closeModal('create-bill')}
          >
            Close
          </button>
          {
            type ? 
          <button
            className="btn btn-ghost bg-emeraldGreen text-white btn-sm"
            onClick={handleEdit}
          >
            Edit
          </button>
          : 
          <button
            className="btn btn-ghost bg-emeraldGreen text-white btn-sm"
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </button>

          }
        </div>
      </ModalDetail>
      <ModalDetail id="delete-bill">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Are you absolutely sure?</span>
          <span>
            Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
            data tagihan secara permanen dan menghapus data tagihan anggota dari
            server kami.
          </span>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => closeModal('delete-bill')}
          >
            Close
          </button>
          <button
            className="btn btn-ghost bg-red-500 text-white btn-sm"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      </ModalDetail>
    </div>
  );
};

export default Tagihan;
