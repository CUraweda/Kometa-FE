import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import Pagination from '@/components/ui/pagination';
import CenterLayout from '@/layout/center.layout';
import { paymentRest } from '@/middleware/Rest';
import { PaymentData } from '@/middleware/Utils';
import { formatDate } from '@/utils/date';
import { formatRupiah } from '@/utils/formatRupiah';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { addDays, format, startOfMonth, endOfMonth } from "date-fns";

const RekapPaymentHistori = () => {
  const [dataPayment, setDataPayment] = useState<PaymentData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateRange, setDateRange] = useState<any>({from: startOfMonth(new Date()), to: endOfMonth(new Date()) })
  const [search, setSearch] = useState<string>('');
  const itemsPerPage = 20;

  useEffect(() => {
    getData();
  }, [search, dateRange]);

  const getData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}&search=transactionId:${search}&gte=createdAt:${dateRange?.from}&lte=createdAt:${dateRange?.to}`;
    const { data } = await paymentRest.getPaymentHistory(payload);
    setTotalItems(data.data.total_items);
    setDataPayment(data.data.items);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDateChange = (dateRange: any) => {
    if (dateRange?.from && dateRange?.to) {
      const date ={ 
        from : dateRange.from.toLocaleDateString('id-ID'),
        to: dateRange.to.toLocaleDateString('id-ID')
      }
     setDateRange(date)
      console.log(dateRange, "okeee");
    }
  };

  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className=" w-full min-h-[calc(100vh-105px)] flex flex-col">
          <span className="text-xl font-bold">Histori Pebayaran Anggota</span>
          <div className="w-full flex justify-end my-5 gap-3 items-center">
            <DatePickerWithRange onSelect={handleDateChange} />
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="ID Transaksi"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoSearchOutline />
            </label>
          </div>

          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>ID Transaksi</th>
                    <th>Nama Member</th>
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
                      <td>{item.member.fullName}</td>
                      <td>{item.purpose}</td>
                      <td>{formatRupiah(item.paymentTotal)}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        {item.paymentDate ? formatDate(item.paymentDate) : '-'}
                      </td>
                      <td>{item.isPaid ? 'Lunas' : 'Belum Dibayar'}</td>
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
    </div>
  );
};

export default RekapPaymentHistori;
