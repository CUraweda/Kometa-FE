import Pagination from '@/components/ui/pagination';
import { paymentRest } from '@/middleware/Rest';
import { PaymentData } from '@/middleware/Utils';
import { formatDate } from '@/utils/date';
import { formatRupiah } from '@/utils/formatRupiah';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TiThList } from 'react-icons/ti';
import ModalDetail, { openModal } from '@/components/ui/ModalDetail';
import { formatDateTime } from '@/utils/formatDate';

const PaymentHistory = () => {
  const [dataPayment, setDataPayment] = useState<PaymentData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const idUser = searchParams.get('idUser');
  const [dataTransaksi, setDataTransaksi] = useState<PaymentData>();

  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]);

  const getData = async () => {
    const payload = `where=memberId:${id}&limit=${itemsPerPage}&page=${currentPage}`;
    const { data } = await paymentRest.getPaymentHistory(payload);
    setTotalItems(data.data.total_items);
    setDataPayment(data.data.items);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const checkPayment = async (idTransaksi: string) => {
    try {
      const response = await paymentRest.getStatusPayment(idTransaksi);
      const data = response?.data?.data;
      openModal('detail-paymentt');
      setDataTransaksi(data);
      console.log('ini jalan');
      
    } catch (error) {
      console.log(error);
    }
  };

    const generatePayment = async () => {
      const payload = {
        paymentType: dataTransaksi?.paymentMethod,
        idUser
      };
      try {
        await paymentRest.generatePayment(payload);
        checkPayment(dataTransaksi?.id ?? '')
      } catch (error) {
        console.log('ini jalan gk ada datanya');
      }
    };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>ID Transaksi</th>
              <th>Keterangan</th>
              <th>Total</th>
              <th>Metode Bayar</th>
              <th>Tanggal Dibuat</th>
              <th>Tanggal Dibayar</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPayment.map((item: PaymentData, index: number) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.transactionId}</td>
                <td>{item.purpose}</td>
                <td>{formatRupiah(item.paymentTotal)}</td>
                <td>{item.paymentMethod}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.paymentDate ? formatDate(item.paymentDate) : '-'}</td>
                <td>{item.isPaid ? 'Lunas' : 'Belum Dibayar'}</td>
                <td>
                  <button
                    className="btn btn-sm bg-primary text-white"
                    onClick={() => checkPayment(item.id)}
                  >
                    <TiThList />
                  </button>
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

      <ModalDetail id="detail-paymentt">
        <span className="text-lg font-bold">Detail Transaksi</span>
        <div className="mt-5">
          <table className="table w-full">
          <tr>
              <td>ID Transaksi</td>
              <td>:</td>
              <td>{dataTransaksi?.transactionId}</td>
            </tr>
            <tr>
              <td>Tanggal Dibuat</td>
              <td>:</td>
              <td>{formatDateTime(dataTransaksi?.createdAt)}</td>
            </tr>
            <tr>
              <td>Tanggal Kadaluarsa</td>
              <td>:</td>
              <td>{formatDateTime(dataTransaksi?.expiredDate)}</td>
            </tr>
            <tr>
              <td>Tanggal Dibayar</td>
              <td>:</td>
              <td>
                {dataTransaksi?.paymentDate
                  ? formatDateTime(dataTransaksi?.paymentDate)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>:</td>
              <td>{dataTransaksi?.purpose}</td>
            </tr>
           
            <tr>
              <td>Status</td>
              <td>:</td>
              <td>{dataTransaksi?.isPaid ? 'Lunas' : 'Belum Dibayar'}</td>
            </tr>
            <tr>
              <td>Metode Bayar</td>
              <td>:</td>
              <td>{dataTransaksi?.paymentMethod}</td>
            </tr>
            <tr>
              <td>Nominal</td>
              <td>:</td>
              <td>{formatRupiah(dataTransaksi?.paymentTotal ?? 0)}</td>
            </tr>
            <tr
              className={
                dataTransaksi?.paymentMethod === 'QRIS' ? 'hidden' : ''
              }
            >
              <td>Nomor Pembayaran</td>
              <td>:</td>
              <td>{dataTransaksi?.virtualAccountNo}</td>
            </tr>
          </table>

          <div
            className={
              dataTransaksi?.paymentMethod === 'QRIS'
                ? dataTransaksi.isPaid
                  ? 'hidden'
                  : new Date(dataTransaksi.expiredDate) < new Date()
                  ? 'hidden'
                  : ''
                : 'hidden'
            }
          >
            <img src={dataTransaksi?.qrisLink} alt="" />
          </div>

          <div
            className={
              dataTransaksi?.isPaid ||
              (dataTransaksi?.expiredDate &&
                new Date(dataTransaksi.expiredDate) > new Date())
                ? 'hidden'
                : ''
            }
          >
            <button className="btn btn-primary text-white w-full" onClick={generatePayment}>
              Generate Ulang Pembayaran
            </button>
          </div>
        </div>
      </ModalDetail>
    </>
  );
};

export default PaymentHistory;
