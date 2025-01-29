import CardBudidaya from "@/components/shared/cardBudidaya";
import Input from "@/components/ui/input";
import CenterLayout from "../../layout/center.layout";
import { useNavigate } from "react-router-dom";
import { listedUser } from "@/constant/routers/listed";

function PlantingPage() {
  const navigate = useNavigate();

  const cards = Array(10).fill({
    activePools: 18,
    totalPools: 20,
    name: "Aji Kusmaryo",
    cultureName: "Nama Budidaya",
  });

  return (
    <CenterLayout className="flex w-full flex-col  justify-start">
      <div className="w-full  h-32 border border-input rounded-md p-3 flex divide-x ">
        <div className="w-1/2 h-full p-3 flex flex-col justify-between">
          <span className="text-green-500 font-bold">Kolam Aktif</span>
          <span className="text-3xl font-bold">120</span>
        </div>
        <div className="w-1/2 h-full p-3 flex flex-col justify-between">
          <span className="text-red-500 font-bold">Total Kolam</span>
          <span className="text-3xl font-bold">120</span>
        </div>
      </div>

      <div className="flex w-full my-5 justify-between items-center">
        <Input
          type="search"
          className="max-w-xs"
          placeholder="Cari"
          icon="search"
        />
        <button
          onClick={() => navigate(listedUser.add)}
          className="btn btn-primary text-white"
        >
          Tambah Budidaya
        </button>
      </div>

      <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <CardBudidaya key={index} {...card} />
        ))}
      </div>
    </CenterLayout>
  );
}

export default PlantingPage;
