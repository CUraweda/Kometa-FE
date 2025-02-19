import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Select from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const ComodityForm = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <form action="submit">
        <h3 className="mt-8 mb-3 font-semibold">Komoditas Budaya</h3>
        <p>Versifikasi Budaya?</p>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <Radio
            id="komoditas"
            onChange={(item) => console.log(item)}
            selected=""
            data={[
              { label: "Ada", value: "ada" },
              { label: "Tidak", value: "tidak" },
            ]}
            error=""
          />
          <Select
            placeholder="Jenis Budaya"
            data={[
              { label: "Nila", value: "Nila" },
              { label: "Lele", value: "Lele" },
              { label: "Gurame", value: "Gurame" },
            ]}
          />
          <div className="hidden md:block"></div>
          <Input type="text" placeholder="Nama Komoditas" />
          <Select
            placeholder="Jenis Kolam"
            data={[
              { label: "Tanah", value: "Tanah" },
              { label: "Beton", value: "Beton" },
              { label: "Terpal (HDPE)", value: "Terpal (HDPE)" },
            ]}
          />
          <Input type="text" placeholder="Total Kolam" />
          <Input type="text" placeholder="Total Kolam Aktif" />
          <Input type="text" placeholder="Rata-Rata Ukuran Kolam" uom="m2" />
          <Input
            type="text"
            placeholder="Ukuran Kolam Terkecil (P x L)"
            uom="m"
          />
          <Input type="text" placeholder="Kedalaman Kolam" uom="m" />
          <Input type="number" placeholder="Ketinggian Air Kolam" uom="m" />
          <Input type="text" placeholder="Kapasitas per Kolam" uom="Ekor" />
          <Input type="text" placeholder="Harga Benur per Ekor" uom="Ekor" />
          <Input type="text" placeholder="Perkiraan Tebar Benur" uom="Ekor" />
          <div className="w-full flex justify-between border border-gray-3 00 rounded-lg">
            <Input
              className="flex-1 border-none"
              type="text"
              placeholder="Lama Masa Siklus Budaya"
            />
            <div className="justify-end">
              <Select
                placeholder="Siklus"
                className="w-[100px] pr-0 border-none"
                data={[
                  { label: "Hari", value: "Hari" },
                  { label: "Minggu", value: "Minggu" },
                  { label: "Bulan", value: "Bulan" },
                ]}
              />
            </div>
          </div>
          <Select
            placeholder="Status Kepemilikan Kolam"
            data={[
              { label: "Milik Sendiri", value: "Milik Sendiri" },
              { label: "Sewa", value: "Sewa" },
              { label: "Bagi Hasil", value: "Bagi Hasil" },
            ]}
          />
          <div className="w-full flex justify-between border border-gray-3 00 rounded-lg">
            <Input
              className="flex-1 border-none"
              type="text"
              placeholder="Umur Kolam / Tambak"
            />
            <div className="justify-end">
              <Select
                placeholder="Siklus"
                className="w-[100px] pr-0 border-none"
                data={[
                  { label: "Siklus", value: "Siklus" },
                  { label: "Tahun", value: "Tahun" },
                ]}
              />
            </div>
          </div>
          <Input type="text" placeholder="Riwayat Penyakit di Kolam" />
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

export default ComodityForm;
