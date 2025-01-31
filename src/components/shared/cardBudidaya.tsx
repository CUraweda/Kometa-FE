import React from 'react';
import { PiPencilSimpleLine, PiTrashLight } from "react-icons/pi";
import { GrExpand } from "react-icons/gr";

interface CardProps {
  activePools: number;
  totalPools: number;
  name: string;
  cultureName: string;
}

const CardBudidaya: React.FC<CardProps> = ({ activePools, totalPools, name, cultureName }) => {
  return (
    <div className="min-w-[calc(100%/3)]">
       <div className="border border-input p-5 rounded-lg shadow-md">

      <div className="flex justify-between items-center mb-2">
        <span className="text-green-600 font-semibold text-sm">{activePools} Kolam Aktif</span>
        <span className="text-red-600 font-semibold text-sm">{totalPools} Total Kolam</span>
      </div>
      <div className="mb-2">
        <p className="font-medium">{name}</p>
        <p className="text-gray-500">{cultureName}</p>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-ghost btn-sm text-orange-500"><PiPencilSimpleLine /></button>
        <button className="btn btn-ghost btn-sm text-blue-500"><GrExpand /></button>
        <button className="btn btn-ghost btn-sm text-red-500"><PiTrashLight /></button>
      </div>
        </div>
    </div>
  );
};

export default CardBudidaya;
