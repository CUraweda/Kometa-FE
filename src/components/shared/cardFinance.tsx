import React from 'react';
import { PiPencilSimpleLine, PiTrashLight } from "react-icons/pi";
import { GrExpand } from "react-icons/gr";

interface CardProps {
  total?: number;
  status?: string;
  name?: string;
  tempo?: string;
  tanggalBayar?: string;
  methodeBayar?: string;
  transaksiId?: string;
}

const CardFinance: React.FC<CardProps> = ({ total, status, name, tempo, tanggalBayar, methodeBayar, transaksiId }) => {
  return (
    <div className="w-full sm:w-1/3 p-3">
      <div className="border border-input p-5 rounded-lg shadow-md">

        <div className="flex justify-between items-center mb-2">
          <span className="text-green-600 font-semibold text-sm">Rp. {total}</span>
          <span className={` ${status == 'Lunas' ? 'text-green-800 bg-green-200' : 'text-red-600 bg-red-200'} text-sm py-1 px-2 rounded-md`}>{status}</span>
        </div>
        <div className="mb-2">
          <p className="font-medium">{name}</p>
          <p className="text-gray-500">{methodeBayar}</p>
        </div>

        {status !== 'Lunas' ?
          <div className="flex justify-between items-center">
            <span className='text-xs'>Jatuh Tempo {tempo}</span>
            <button className="btn btn-ghost btn-sm btn-outline text-green-500">Bayar</button>
          </div>
          :
          <div className="flex justify-between items-center">
            <div className='flex flex-col gap-2'>
              <p className='text-xs'>Transaksi ID</p>
              <p className='text-sm'>{transaksiId}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-xs'>Tanggal</p>
              <p className='text-sm'>{tanggalBayar}</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
};

export default CardFinance;
