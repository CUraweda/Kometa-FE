import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Select from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const KYCPersonalForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form action="">
        <h3 className="mt-8 mb-3 font-bold">KYC Pribadi</h3>
        <p className="font-medium mt-5">Informasi Aset (Optional)</p>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <Input
            type="text"
            placeholder="Total Aset Kendaraan Roda Dua"
            uom="Unit"
          />
          <Input
            type="text"
            placeholder="Total Aset Kendaraan Roda Empat"
            uom="Unit"
          />
          <Select
            placeholder="Status Kepemilikan Rumah"
            data={[
              { label: "Milik Sendiri", value: "milik sendiri" },
              { label: "Sewa-Kontrak", value: "sewa kontrak" },
              { label: "KPR", value: "KPR" },
              { label: "Milik Orang Tua", value: "milik orang tua" },
            ]}
          />
          <Input type="text" placeholder="Lama Menempati Rumah" uom="Tahun" />
        </div>

        <p className="font-medium mt-5">
          Informasi Pinjaman Pribadi (Optional)
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <div className="">
            <p>Apakah Anda Pernah Memiliki Pinjaman?</p>
            <Radio
              id="radio"
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
          <div className="md:col-span-2 md:w-1/2">
            <p>Pernah Memiliki Kredit Macet?</p>
            <Radio
              id="radio2"
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
          <Select
            placeholder="Lembaga Pemberi Pinjaman"
            data={[
              { label: "Milik Sendiri", value: "milik_sendiri" },
              { label: "Kontrak", value: "kontrak" },
              { label: "Kost", value: "kost" },
              { label: "Tinggal dengan Orang Tua", value: "tinggal_orang_tua" },
            ]}
          />
          <Input type="text" placeholder="Nama Lembaga Pemberi Pinjaman" />
          <Input type="text" placeholder="Jumlah Pinjaman" />
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

export default KYCPersonalForm;
