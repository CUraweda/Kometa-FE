import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const HarvestForm = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <form action="">
        <h3 className="mt-8 mb-3 font-bold">Panen</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <div className="w-full flex justify-between border border-gray-3 00 rounded-lg">
            <Input
              className="flex-1 border-none"
              type="text"
              placeholder="Panen Setiap"
            />
            <div className="justify-end">
              <Select
                placeholder="Hari"
                className="w-[100px] pr-0 border-none"
                data={[
                  { label: "Hari", value: "Hari" },
                  { label: "Minggu", value: "Minggu" },
                  { label: "Bulan", value: "Bulan" },
                ]}
              />
            </div>
          </div>
          <div className="w-full flex justify-between border border-gray-3 00 rounded-lg">
            <Input
              className="flex-1 border-none"
              type="text"
              placeholder="Rata-rata Tonase Panen / Kolam"
            />
            <div className="justify-end">
              <Select
                placeholder="Kg"
                className="w-[100px] pr-0 border-none"
                data={[
                  { label: "Kg", value: "Kg" },
                  { label: "Kwintal", value: "Kwintal" },
                  { label: "Ton", value: "Ton" },
                ]}
              />
            </div>
          </div>
          <div className="w-full flex justify-between border border-gray-3 00 rounded-lg">
            <Input
              className="flex-1 border-none"
              type="text"
              placeholder="Target Tonase Panen / Kolam"
            />
            <div className="justify-end">
              <Select
                placeholder="Kg"
                className="w-[100px] pr-0 border-none"
                data={[
                  { label: "Kg", value: "Kg" },
                  { label: "Kwintal", value: "Kwintal" },
                  { label: "Ton", value: "Ton" },
                ]}
              />
            </div>
          </div>
        </div>

        <p className="mt-7 font-semibold">Harga Jual Komoditas</p>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <Input type="text" placeholder="Harga Rata - Rata" uom="Kg" />
          <Input type="text" placeholder="Harga Terendah" uom="Kg" />
          <Input type="text" placeholder="Harga Tertinggi" uom="Kg" />
          <Input type="text" placeholder="Nama Pembeli" />
          <Input type="text" placeholder="Area Pembeli" />
          <Input type="text" placeholder="Nomor WhatsApp Pembeli" />
          <Input type="text" placeholder="Nilai FCR" />
          <Input type="text" placeholder="Kondisi Hasil Panen" />
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

export default HarvestForm;
