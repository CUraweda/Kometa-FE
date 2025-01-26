import CardBudidaya from "@/components/shared/cardBudidaya";
import CenterLayout from "../layout/center.layout";
import { CiSearch } from "react-icons/ci";

function PlantingPage() {
  const cards = Array(10).fill({
    activePools: 18,
    totalPools: 20,
    name: 'Aji Kusmaryo',
    cultureName: 'Nama Budidaya',
  });

  return (
    <div>
      <CenterLayout className="flex w-full flex-col  justify-start">
        <div className="w-full  h-32 border border-input rounded-md p-3 flex divide-x ">
          <div className="w-1/2 h-full p-3 flex flex-col justify-between" >
            <span className="text-green-500 font-bold">
              Kolam Aktif
            </span>
            <span className="text-3xl font-bold">
              120
            </span>
          </div>
          <div className="w-1/2 h-full p-3 flex flex-col justify-between" >
            <span className="text-red-500 font-bold">
              Total Kolam
            </span>
            <span className="text-3xl font-bold">
              120
            </span>
          </div>
        </div>

        <div className="flex w-full my-5 justify-between ">
          <label className="input input-bordered flex items-center gap-2">
            <CiSearch />
            <input type="text" className="grow" placeholder="Cari" />
          </label>
          <button className="btn btn-ghost bg-emeraldGreen text-white">Tambah Budidaya</button>

        </div>

        <div className="flex w-full flex-wrap ">
          {cards.map((card, index) => (
            <CardBudidaya key={index} {...card} />
          ))}
        </div>
      </CenterLayout>
    </div>
  )
}

export default PlantingPage;
