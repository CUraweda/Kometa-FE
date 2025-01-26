import {
  accumulationData,
  dataPengajuan,
  statistics,
  tagihanSimpanan,
} from "@/constant/dashboard/main";
import CenterLayout from "../layout/center.layout";
import Input from "@/components/ui/input";
import React, { useState } from "react";
import Badge from "@/components/ui/badge";
import { landType } from "@/constant/form/land.data";
import { LuPenLine, LuTrash2 } from "react-icons/lu";
import { convertToRupiah } from "@/utils/rupiah";
import { color } from "@/constant/style";
import { formatDate } from "@/utils/date";
import Graph from "@/components/ui/graph";

function DashboardPage() {
  const [filter, setFilter] = useState(7);

  return (
    <CenterLayout className="min-h-[calc(100vh-105px)]">
      <div className="space-y-8">
        <div className="flex gap-3">
          <Input type="date" className="max-w-[180px] ml-auto" />
          {["7 Hari", "30 Hari", "12 Bulan"].map((item) => {
            const isActive = filter == Number(item.split(" ")[0]);
            return (
              <button
                className={`btn ${
                  isActive
                    ? "btn-primary text-white font-semibold"
                    : "btn-outline text-primary hover:border-primary hover:bg-transparent hover:text-primary"
                } font-light`}
                onClick={() => setFilter(Number(item.split(" ")[0]))}
                key={item}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="flex items-start gap-8">
          <div className="border border-[#EBEBEB] min-h-[465px] rounded-lg p-6">
            {statistics.map(({ title, value, color }, index) => (
              <React.Fragment>
                <div
                  key={title}
                  className="min-h-[100px] flex flex-col justify-between"
                >
                  <label className={`text-xs`} style={{ color }}>
                    {title}
                  </label>
                  <h2 className="text-2xl font-semibold text-gray-600">{`${value} ${
                    index == 2 ? "Ha" : ""
                  }`}</h2>
                </div>
                {index < 2 ? (
                  <div className="border-b border-[#EBEBEB] my-7" />
                ) : null}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-1 justify-center items-center w-[800px] min-h-[465px] rounded-lg border border-[#EBEBEB]">
            <Graph data={accumulationData} />
          </div>
        </div>
        <div className="flex gap-8 w-full">
          <div className="flex-1 flex flex-col p-6 space-y-6 border border-[#EBEBEB] rounded-xl">
            <h3 className="text-gray-500">Pengajuan <span className="text-emeraldGreen">Lahan</span></h3>
            {dataPengajuan.map((item) => {
              const {
                id,
                luas,
                nama,
                nama_pt,
                kepemilikan,
                isBuilding,
                isApproved,
              } = item;

              const land = landType[kepemilikan as keyof typeof landType];

              return (
                <div
                  key={`pengajuan-${id}`}
                  className="flex flex-col gap-6 p-6 border border-[#EBEBEB] rounded-xl hover:border-emeraldGreen cursor-pointer max-h-[220px]"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-semibold">
                      {luas} <span className="text-sm font-medium">Ha</span>
                    </h3>
                    <div className="flex items-center gap-3">
                      <Badge
                        label={land.label}
                        color={land.dark}
                        background={land.light}
                      />
                      <Badge
                        label={!isApproved ? "Ditolak" : "Disetujui"}
                        color={land.dark}
                        background={land.light}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium">{nama}</h3>
                    <h5 className="text-sm tracking-wide text-gray-500">
                      {nama_pt}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 bg-gray-100 rounded-lg px-2 py-1">
                      {isBuilding ? "Bangunan" : "Tanah Kosong"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="group btn btn-ghost btn-xs hover:bg-slate-50">
                        <LuPenLine className="group-hover:stroke-emeraldGreen" />
                      </button>
                      <span className="group btn btn-ghost btn-xs hover:bg-slate-50">
                        <LuTrash2 className="group-hover:stroke-red-600" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col p-6 space-y-6 border border-[#EBEBEB] rounded-xl">
            <h3 className="text-gray-500">Tagihan <span className="text-emeraldGreen">Simpanan</span></h3>
            {tagihanSimpanan.map((item) => {
              const { id, total, title, jatuh_tempo, isPaid } = item;

              return (
                <div
                  key={`tagihan-${id}`}
                  className="flex flex-col gap-6 p-6 border border-[#EBEBEB] rounded-xl hover:border-emeraldGreen cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-semibold">
                      {convertToRupiah(total)}
                    </h3>
                    <Badge
                      label={isPaid ? "Lunas" : "Belum Dibayar"}
                      color={isPaid ? color.success.text : color.red.text}
                      background={
                        isPaid ? color.success.background : color.red.background
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <h5 className="text-sm tracking-wide text-gray-500">
                      Jatuh tempo {formatDate(jatuh_tempo)}
                    </h5>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="btn btn-outline btn-success hover:!text-white btn-sm font-light">
                      Bayar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CenterLayout>
  );
}

export default DashboardPage;
