import { paymentRest } from '@/middleware/Rest';
import { PaymentData } from '@/middleware/Utils';
import { formatDate } from '@/utils/date';
import { formatRupiah } from '@/utils/formatRupiah';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentHistory = () => {
  const [dataPayment, setDataPayment] = useState<PaymentData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const payload = `whare=memberId:${id}&limit=${itemsPerPage}&page=${currentPage}`;
    const { data } = await paymentRest.getPaymentHistory(payload);
    setTotalItems(data.data.total_items);
    setDataPayment(data.data.items);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
