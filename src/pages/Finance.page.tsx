import CardFinance from '@/components/shared/cardFinance';
import Input from '@/components/ui/input';
import CenterLayout from '../layout/center.layout';
import { useEffect, useState } from 'react';
import { PaymentData } from '@/middleware/Utils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentRest } from '@/middleware/Rest';
import useMemberStore from '@/store/home.store';
import Pagination from '@/components/ui/pagination';
import ModalDetail, { closeModal } from '@/components/ui/ModalDetail';
import PaymentMethod from '@/components/shared/payment.component';
import { listedUser } from '@/constant/routers/listed';
import Swal from 'sweetalert2';
import getErrorMessage from '@/utils/apiHelper';
import { formatRupiah } from '@/utils/formatRupiah';

interface card {
  total: number;
  status: string;
  name: string;
  tempo: string;
  tanggalBayar: string;
  methodeBayar: string;
  transaksiId: string;
}
function FinancePage() {
  const [dataPaidPayment, setDataPaidPayment] = useState<card[]>([]);
  const [dataPayment, setDataPayment] = useState<card[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTagihan, setTotalTagihan] = useState<number>(0);
  const [totalSimpanan, setTotalSimpanan] = useState<number>(0);
  const [totalAdmin, setTotalAdmin] = useState<number>(0);
  const [payment, setPayment] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();
  const { idMember } = useMemberStore();

  useEffect(() => {
    getData();
    getDataNotPaid();
  }, [currentPage, currentPage, itemsPerPage]);

  const getData = async () => {
    const payload = `where=memberId:${idMember}|isPaid:true&limit=100&page=${currentPage}`;
    const { data } = await paymentRest.getPaymentHistory(payload);
    const dataPaid: card[] = await Promise.all(
      data.data.items.map(async (item: PaymentData) => {
        return {
          total: item.paymentTotal,
          status: item.isPaid,
          name: item.purpose,
          tempo: item.expiredDate,
          tanggalBayar: item.paymentDate,
          methodeBayar: item.paymentMethod,
          transaksiId: item.transactionId,
        };
      })
    );
    const totalSumForSimpanan = dataPaid
      .filter((item) => item.name.toLowerCase().startsWith('simpanan'))
      .reduce((accumulator, currentItem) => accumulator + currentItem.total, 0);
    const totalSumForAdmin = dataPaid
      .filter((item) => item.name.toLowerCase().startsWith('admin'))
      .reduce((accumulator, currentItem) => accumulator + currentItem.total, 0);
    setTotalSimpanan(totalSumForSimpanan);
    setTotalAdmin(totalSumForAdmin);
    setTotalItems(data.data.total_items);
    setDataPaidPayment(dataPaid);
  };
  const getDataNotPaid = async () => {
    const payload = `where=memberId:${idMember}|isPaymentSuccess:false&limit=${itemsPerPage}&page=${currentPage}`;
    const { data } = await paymentRest.getBillData(payload);
    const dataPaid: card[] = await Promise.all(
      data?.data.items.map(async (item: any) => {
        return {
          total: item.totalPayment,
          status: item.isPaymentSuccess,
          name: item.payment?.purpose,
          tempo: item?.SavingReference?.paymentDueDate,
          tanggalBayar: item.paymentDate,
          methodeBayar: item.payment?.paymentMethod,
          transaksiId: item.payment?.id,
        };
      })
    );
    const totalSum = dataPaid.reduce(
      (accumulator, currentItem) => accumulator + currentItem.total,
      0
    );
    setTotalTagihan(totalSum);
   
    setDataPayment(dataPaid);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };
  const params = new URLSearchParams({
    type: payment?.value ?? 'QRIS',
    id: id ?? '',
  });

  const handlePay = async () => {
    try {
      setLoading(true);
      const data = {
        transactionId: id,
        paymentType: payment.value,
      };
      await paymentRest.createPayment(data);

      navigate(
        `${
          payment?.value === 'QRIS' ? listedUser.payment : listedUser.paymentVa
        }?${params.toString()}`
      );
    } catch (error) {
      closeModal('create-payment');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
      throw new Error(getErrorMessage(error, 'failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <CenterLayout className="flex w-full flex-col  justify-start">
        <div className="w-full flex-col sm:flex-row flex ">
          <div className="w-full sm:w-1/3 p-3 ">
            <div className="card h-32 border-l-[5px] border-red-500 bg-white shadow p-5 gap-2 flex flex-col justify-center">
              <span className="text-xl font-bold text-red-500">
                Total Tunggakan
              </span>
              <span className="text-2xl">{formatRupiah(totalTagihan)}</span>
            </div>
          </div>
          <div className="w-full sm:w-1/3 p-3">
            <div className="card h-32 border-l-[5px] border-green-700 bg-white shadow p-5 gap-2 flex flex-col justify-center">
              <span className="text-xl font-bold text-green-700">
                Total Simpanan
              </span>
              <span className="text-2xl">{formatRupiah(totalSimpanan)}</span>
            </div>
          </div>
          <div className="w-full sm:w-1/3 p-3">
            <div className="card h-32 border-l-[5px] border-blue-700 bg-white shadow p-5 gap-2 flex flex-col justify-center">
              <span className="text-xl font-bold text-blue-700">
                Total Admin
              </span>
              <span className="text-2xl">{formatRupiah(totalAdmin)}</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start mb-5 space-y-3 mt-5">
          <span className="font-bold">Daftar Tagihan</span>

          <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dataPayment.map((card, index) => (
              <CardFinance key={index} {...card} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start space-y-3">
          <span className="font-bold">Histori Pembayaran</span>
          <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dataPaidPayment.map((card, index) => (
              <CardFinance key={index} {...card} />
            ))}
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
      </CenterLayout>

      <ModalDetail id="create-payment" width="w-11/12 max-w-5xl">
        <span className="font-bold">Pilih Metode Pembayaran</span>
        <PaymentMethod
          selected={payment?.value}
          onChange={(item) => setPayment(item)}
        />
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => closeModal('create-payment')}
          >
            Close
          </button>
          <button
            className={`btn btn-ghost bg-emeraldGreen text-white btn-sm ${
              loading ? 'btn-disabled' : ''
            }`}
            onClick={handlePay}
          >
            Bayar
          </button>
        </div>
      </ModalDetail>
    </div>
  );
}

export default FinancePage;
