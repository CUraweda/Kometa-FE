import React from 'react';
import { formatDateString } from '@/utils/formatDate';
import { openModal } from '../ui/ModalDetail';
import { useNavigate } from 'react-router-dom';
import { listedUser } from '@/constant/routers/listed';
import { formatRupiah } from '@/utils/formatRupiah';

interface CardProps {
  total?: number;
  status?: string;
  name?: string;
  tempo?: string;
  tanggalBayar?: string;
  methodeBayar?: string;
  transaksiId?: string;
}

const CardFinance: React.FC<CardProps> = ({
  total,
  status,
  name,
  tempo,
  tanggalBayar,
  methodeBayar,
  transaksiId,
}) => {
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate(`/${listedUser.finance}?id=${transaksiId}`);
    openModal('create-payment');
  };
  const handleDetail = () => {
    navigate(
      `${
        methodeBayar === 'QRIS' ? listedUser.payment : listedUser.paymentVa
      }?id=${transaksiId}`
    );
  };
  return (
    <div className="min-w-[calc(100%/3)]">
      <div className="border border-input p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-600 font-semibold text-sm">
            {total ? formatRupiah(total) : '-'}
          </span>
          <span
            className={` ${
              status ? 'text-green-800 bg-green-200' : 'text-red-600 bg-red-200'
            } text-sm py-1 px-2 rounded-md`}
          >
            {status ? 'Lunas' : 'Belum Bayar'}
          </span>
        </div>
        <div className="mb-2">
          <p className="font-medium">{name}</p>
          <p className="text-gray-500">{methodeBayar}</p>
        </div>

        {!status ? (
          <div className="flex justify-between items-center">
            <span className="text-xs flex flex-col">
              Jatuh Tempo <span>{formatDateString(tempo)}</span>
            </span>
            {methodeBayar && (
              <button
                className="btn btn-ghost btn-sm btn-outline text-green-500"
                onClick={handleDetail}
              >
                Detail
              </button>
            )}
            {!methodeBayar && (
              <button
                className="btn btn-ghost btn-sm  bg-emeraldGreen text-white"
                onClick={handlePayment}
              >
                Bayar
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="text-xs">Transaksi ID</p>
              <p className="text-sm">{transaksiId}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs">Tanggal Bayar</p>
              <p className="text-sm">{formatDateString(tanggalBayar)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardFinance;
