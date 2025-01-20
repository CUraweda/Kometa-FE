import {
  fakerLand,
  landFilter,
  landType,
  listLand,
} from "@/constant/form/land.data";
import CenterLayout from "../layout/center.layout";
import Input from "@/component/ui/input";
import { useState } from "react";
import Select from "@/component/ui/select";
import LandCard from "@/component/shared/landcard.component";
import Pagination from "@/component/ui/pagination";

function LandPage() {
  const [search, setSearch] = useState("");

  return (
    <CenterLayout className="min-h-[calc(100vh-105px)] items-start">
      <div className="w-full space-y-3">
        <div className="rounded-lg border h-36 flex items-center divide-x py-5 px-2 divide-gray-200 gap w-full">
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
        <div className="flex justify-between items-center">
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
          <button className="btn btn-primary text-white">Tambah</button>
        </div>
        <div className="grid grid-cols-3 gap-5">
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
