import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Select from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const FasilityForm = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <form action="submit">
        <h3 className="mt-8 mb-3 font-semibold">Fasilitas Infrastruktur</h3>
        <p>Ketersediaan Ipal?</p>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <div className="md:col-span-3 md:w-1/3 flex gap-4">
            <Radio
              id="fasilitas"
              className="md:mr-3"
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
            placeholder="Sumber Air"
            data={[
              { label: "Air Laut", value: "Air Laut" },
              { label: "Muara", value: "Muara" },
              { label: "Sumur Bor", value: "Sumur Bor" },
            ]}
          />
          <Select
            placeholder="Sumber Listrik"
            data={[
              { label: "PLN", value: "PLN" },
              { label: "Generator", value: "Generator" },
              { label: "Tenaga Surya", value: "Tenaga Surya" },
              { label: "Tenaga Kincir", value: "Tenaga Kincir" },
            ]}
          />
          <Select
            placeholder="Kualitas Provider Internet"
            data={[
              { label: "5G", value: "5G" },
              { label: "4G", value: "4G" },
              { label: "3G", value: "3G" },
              { label: "2G", value: "2G" },
            ]}
          />
          <Input type="text" placeholder="Nama Provider Internet" />
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

export default FasilityForm;
