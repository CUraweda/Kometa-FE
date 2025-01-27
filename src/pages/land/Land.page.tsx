import {
  fakerLand,
  landFilter,
  landType,
  listLand,
} from "@/constant/form/land.data";
import CenterLayout from "../../layout/center.layout";
import Input from "@/components/ui/input";
import { useState } from "react";
import Select from "@/components/ui/select";
import LandCard from "@/components/shared/landcard.component";
import Pagination from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { listedUser } from "@/constant/routers/listed";

function LandPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();



  return (
    <CenterLayout className="min-h-[calc(100vh-105px)] items-start">
      <div className="w-full space-y-3">
        <div className="rounded-lg border h-36 flex items-center divide-x py-5 px-2 divide-gray-200 gap w-full ">
          {fakerLand.map(({ id, value }) => {
            const land = landType[id as keyof typeof landType];
            return (
              <div className="px-8 flex-1 h-full flex flex-col justify-between items-start">
                <h3
                  style={{ color: land.dark }}
                  className="text-sm font-semibold"
                >
                  {land.label}
                </h3>
                <p>
                  <span className="text-4xl font-medium">{value}</span>{" "}
                  <span className="text-gray-500 ml-3">Ha</span>
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-4 w-3xl">
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
          </div>
          <button className="btn btn-ghost bg-emeraldGreen text-white" onClick={() => navigate(listedUser.tambahLahan)}>Tambah</button>
        </div>
        <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {listLand.map((item) => (
            <LandCard {...item} />
          ))}
        </div>
        <div className="flex justify-center w-full py-5">
          <Pagination />
        </div>
      </div>
    </CenterLayout>
  );
}

export default LandPage;
