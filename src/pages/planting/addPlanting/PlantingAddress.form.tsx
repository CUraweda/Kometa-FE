import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const PlantingAddressForm = () => {
  const navigate = useNavigate();

  const provinces = [
    { label: "Jawa Barat", value: "Jawa Barat" },
    { label: "Jawa Tengah", value: "Jawa Tengah" },
  ];

  const cities = [
    { label: "Bandung", value: "Bandung" },
    { label: "Semarang", value: "Semarang" },
  ];

  const districts = [
    { label: "Cicendo", value: "Cicendo" },
    { label: "Tembalang", value: "Tembalang" },
  ];

  const villages = [
    { label: "Sukajadi", value: "Sukajadi" },
    { label: "Pedalangan", value: "Pedalangan" },
  ];

  return (
    <div className="w-full">
      <form action="submit">
        <h3 className="mt-8 mb-3 font-semibold">Alamat Budidaya</h3>
        <div className="flex flex-col gap-3 md:flex-row md:gap-7">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />{" "}
            <label htmlFor="airplane-mode">Sama Seperti KTP</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />{" "}
            <label htmlFor="airplane-mode">Sama Seperti Alamat Domisili</label>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Select placeholder="Provinsi" data={provinces} />
          <Select placeholder="Kota / Kabupaten" data={cities} />
          <Select placeholder="Kecamatan" data={districts} />
          <Select placeholder="Desa / Kelurahan" data={villages} />
          <Input type="text" placeholder="Kode POS" />
          <Input type="text" placeholder="Detail Alamat" />
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

export default PlantingAddressForm;
