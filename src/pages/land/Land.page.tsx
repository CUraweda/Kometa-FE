
import CenterLayout from "../../layout/center.layout";

import { useEffect, useState } from "react";

import LandCard from "@/components/shared/landcard.component";
// import Pagination from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { listedUser } from "@/constant/routers/listed";
import { landApi } from "@/middleware";
import useMemberStore from "@/store/home.store";
import { LandData } from "@/middleware/Utils";

interface LandItem {
  ownershipStatus: "SHM" | "Girik" | "Kontrak/Sewa";
  wideArea: number;
}

function LandPage() {
  const navigate = useNavigate();
  const { idMember } = useMemberStore();

  const [data, setData] = useState<LandData[]>()
  const [land, setLand] = useState<any>()
  
  const getData = async () => {
    const response = await landApi.getAllByMember(idMember)
    if (response.data && response.data.data.items) {
      setData(response.data.data.items)
      const rest = recapLand(response.data.data.items)
      setLand(rest)
      
    }
  }

  const recapLand = (data: LandItem[]): Record<string, number> => {
    if (!Array.isArray(data)) return { SHM: 0, Girik: 0, Kontrak: 0 };
  
    return data.reduce(
      (acc, item) => {
        const area = item.wideArea ?? 0; // Menghindari kemungkinan undefined/null
        if (item.ownershipStatus === "SHM") acc.SHM += area;
        if (item.ownershipStatus === "Girik") acc.Girik += area;
        if (item.ownershipStatus === "Kontrak/Sewa") acc.Kontrak += area;
        return acc;
      },
      { SHM: 0, Girik: 0, Kontrak: 0 }
    );
  };

  useEffect(() => {
    getData()
  }, [])


  return (
    <CenterLayout className="items-start">
      <div className="w-full space-y-3">
      <div className='w-full flex-col sm:flex-row flex'>
            <div className='w-full sm:w-1/3'>

              <div className='card-custom card mb-5 h-32 w-full border-l-[5px] border-blue-700 bg-white shadow p-5 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-blue-500">
                  Total Lahan SHM
                </h3>
                <div className="flex gap-3 items-end">
                  <span className="text-4xl font-bold ">{land?.SHM}</span>
                  <span className="text-sm font-medium">Ha</span>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-1/3 px-0 sm:px-3'>

              <div className='card-custom card mb-5 h-32 w-full border-l-[5px] border-orange-500 bg-white shadow p-5 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-orange-500">Total Lahan Girik</h3>
                <div className="flex gap-3 items-end">
                  <span className="text-4xl font-bold ">{land?.Girik}</span>
                  <span className="text-sm font-medium">Ha</span>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-1/3'>

              <div className='card-custom card mb-5 h-32 w-full border-l-[5px] border-green-700 bg-white shadow p-5 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-green-500">Total Lahan Kontrak/Sewa</h3>
                <div className="flex gap-3 items-end">
                  <span className="text-4xl font-bold ">{land?.Kontrak}</span>
                  <span className="text-sm font-medium">Ha</span>
                </div>
              </div>
            </div>

          </div>

        <div className="flex justify-end items-center flex-wrap gap-2">
          {/* <div className="flex gap-4 w-3xl">
            <Input
              type="search"
              className=""
              placeholder="Cari"
              icon="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Select
              className="w-[200px]"
              data={landFilter}
              placeholder="Status Kepemilikan"
            />
          </div> */}
          <button className="btn btn-ghost bg-emeraldGreen text-white" onClick={() => navigate(listedUser.tambahLahan)}>Tambah</button>
        </div>
        <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((item : LandData) => (
            <LandCard {...item} />
          ))}
        </div>
        <div className="flex justify-center w-full py-5">
          {/* <Pagination /> */}
        </div>
      </div>
    </CenterLayout>
  );
}

export default LandPage;
