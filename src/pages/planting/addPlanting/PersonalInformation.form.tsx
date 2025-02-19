import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Select from "@/components/ui/select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
const PersonalInformationForm = () => {
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
        {/* informasi pribadi */}
        <h3 className="mt-8 mb-3 font-semibold">Informasi Pribadi</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Input type="text" placeholder="Nama Lengkap" />
          <Input type="text" placeholder="Nomor Whatsapp" />
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="NIK" />
          <Input type="text" placeholder="NPWP" />
          <Input type="text" placeholder="Nama Bank" />
          <Radio
            id="gender"
            className="w-full "
            onChange={(item) => console.log(item)}
            selected=""
            data={[
              { label: "Pria", value: "pria" },
              { label: "Wanita", value: "wanita" },
            ]}
            error=""
          />
          <Select
            placeholder="Agama"
            data={[{ label: "Islam", value: "Islam" }]}
          />
          <Select
            placeholder="Status Perkawinan"
            data={[
              { label: "Kawin", value: "Kawin" },
              { label: "Belum Kawin", value: "Belum Kawin" },
              { label: "Janda", value: "Janda" },
              { label: "Duda", value: "Duda" },
            ]}
          />
          <div className="flex items-center gap-3 w-full">
            <Input type="text" placeholder="Tempat Lahir" />
            <DatePicker
              onDateSelect={(date) => console.log(date)}
              placeholder="Tanggal Lahir"
            />
          </div>
          <Select
            placeholder="Pendidikan Terakhir"
            data={[
              { label: "SD", value: "SD" },
              { label: "SMP", value: "SMP" },
              { label: "SMA", value: "SMA" },
              { label: "Diploma", value: "Diploma" },
            ]}
          />
          <Select placeholder="Provinsi" data={provinces} />
          <Select placeholder="Kota / Kabupaten" data={cities} />
          <Select placeholder="Kecamatan" data={districts} />
          <Select placeholder="Desa / Kelurahan" data={villages} />
          <Input type="text" placeholder="Kode POS" />
          <Input type="text" placeholder="Detail Alamat" />
        </div>

        {/* Alamat Domisili */}
        <h3 className="mt-8 mb-3 font-semibold">Alamat Domisili</h3>
        <div className="flex items-center space-x-2 mb-3">
          <Switch id="airplane-mode" />{" "}
          <label htmlFor="airplane-mode">Sama Seperti KTP</label>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Select placeholder="Provinsi" data={provinces}></Select>
          <Select placeholder="Kota / Kabupaten" data={cities}></Select>
          <Select placeholder="Kecamatan" data={districts}></Select>
          <Select placeholder="Desa / Kelurahan" data={villages}></Select>
          <Input type="text" placeholder="Kode POS" />
          <Input type="text" placeholder="Detail Alamat" />
        </div>

        <div className="flex items-center space-x-2 mb-3 mt-7">
          <Switch id="airplane-mode" />{" "}
          <label htmlFor="airplane-mode">Memiliki Pekerjaan Lain?</label>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Select
            placeholder="Jenis Pekerjaan"
            data={[
              { label: "Swasta", value: "Swasta" },
              { label: "Pelajar / Mahasiswa", value: "Pelajar / Mahasiswa" },
            ]}
          />
        </div>

        {/* Model Budidaya */}
        <h3 className="mt-8 mb-3 font-semibold">Model Budidaya</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Select
            placeholder="Model Bisnis Budidaya"
            data={[
              { label: "Individu", value: "Individu" },
              { label: "Kelompok Tani", value: "Kelompok Tani" },
              { label: "Inti Plasma", value: "Inti Plasma" },
              { label: "Perusahaan", value: "Perusahaan" },
            ]}
          />
          <Select
            placeholder="Peran Dalam Bisnis Budidaya"
            data={[
              { label: "Pemilik", value: "Pemilik" },
              { label: "Manager", value: "Manager" },
            ]}
          />
          <Input type="text" placeholder="Nama Perusahaan / Kelompok Tani" />
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

export default PersonalInformationForm;
