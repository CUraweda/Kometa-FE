import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import { useNavigate } from "react-router-dom";

const KYCPlantingForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form action="">
        <h3 className="mt-8 mb-3 font-bold">KYC Budidaya</h3>
        <Input
          type="text"
          placeholder="Jumlah Kolam Aktif yang diajukan Pembiayaan"
          className="w-1/3"
        />
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          <div className="md:col-span-3 md:w-1/3">
            <p className="font-medium">Apakah memiliki SOP Budidaya?</p>
            <Radio
              id="sop-budidaya"
              className="md:mr-2 mt-2"
              onChange={(item) => console.log(item)}
              selected=""
              data={[
                { label: "Ada", value: "ada" },
                { label: "Tidak", value: "tidak" },
              ]}
              error=""
            />
          </div>

          <div>
            <p className="font-medium">
              Memiliki metode Pengumpulan Data Budidaya?
            </p>
            <Radio
              id="metode-pengumpulan-data"
              className="mt-2"
              onChange={(item) => console.log(item)}
              selected=""
              data={[
                { label: "Ada", value: "ada" },
                { label: "Tidak", value: "tidak" },
              ]}
              error=""
            />
          </div>

          <div>
            <p className="font-medium">Data Kualitas Panen?</p>
            <Radio
              id="data-kualitas-panen"
              className="mt-2"
              onChange={(item) => console.log(item)}
              selected=""
              data={[
                { label: "Ada", value: "ada" },
                { label: "Tidak", value: "tidak" },
              ]}
              error=""
            />
          </div>

          <div>
            <p className="font-medium">Data Panen?</p>
            <Radio
              id="data-panen"
              className="mt-2"
              onChange={(item) => console.log(item)}
              selected=""
              data={[
                { label: "Ada", value: "ada" },
                { label: "Tidak", value: "tidak" },
              ]}
              error=""
            />
          </div>
        </div>

        {/* Data Penggunaan Sarana Produksi Tambak */}
        <p className="font-medium mt-5">
          Data Penggunaan Sarana Produksi Tambak
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <Input type="text" placeholder="Feeder" uom="Unit" />
          <Input type="text" placeholder="Kinci" uom="Unit" />
          <Input type="text" placeholder="Disinfectant" />
          <Input type="text" placeholder="Supplement" />
          <Input type="text" placeholder="" />
          <Input type="text" placeholder="" />
          <Input type="text" placeholder="Lama berbudidaya Udang" uom="Bulan" />
          <Input
            type="text"
            placeholder="Biaya Produksi Budidaya"
            uom="Siklus"
          />
          <Input
            type="text"
            placeholder="Biaya Operasional Budidaya"
            uom="Siklus"
          />
          <Input type="text" placeholder="Keuntungan Budidaya" uom="Siklus" />
        </div>

        {/* Memiliki Karyawan? */}
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          <div className="md:col-span-3 md:w-1/3">
            <p className="font-medium">Apakah Anda Memiliki Karyawan?</p>
            <Radio
              id="sop-budidaya"
              className="md:mr-2 mt-2"
              onChange={(item) => console.log(item)}
              selected=""
              data={[
                { label: "Ada", value: "ada" },
                { label: "Tidak", value: "tidak" },
              ]}
              error=""
            />
          </div>

          <Input type="text" placeholder="Total Karyawan" uom="Orang" />
          <Input
            type="text"
            placeholder="Gaji Karyawan"
            uom="/ Orang / Bulan"
          />
          <Input
            type="text"
            placeholder="Total Kolam yang dikelola per Karyawan"
            uom="Kolam"
          />
        </div>

        {/* button */}
        <div className="space-x-3 mt-7 mb-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/planting/add")}
          >
            Kembali
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default KYCPlantingForm;
