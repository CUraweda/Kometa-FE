import { Checkbox } from "@/components/ui/checkbox";
import { PiPencilSimpleLine } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function AddPlanting() {
  const navigate = useNavigate();

  const sections = [
    { label: "Informasi Pribadi", path: "personal-information" },
    { label: "Alamat Budidaya", path: "address" },
    { label: "Fasilitas Infrastruktur", path: "fasility" },
    { label: "Komoditas Budidaya", path: "comodity" },
    { label: "Penggunaan Pakan per Kolam", path: "food" },
    { label: "Panen", path: "harvest" },
    { label: "KYC Budidaya", path: "kyc-planting" },
    { label: "KYC Pribadi", path: "kyc-personal" },
    { label: "Dokumen", path: "documents" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="border border-input flex justify-between hover:border-primary p-5 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Checkbox id={`checkbox-${index}`} />
            <label
              htmlFor={`checkbox-${index}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {section.label}
            </label>
          </div>

          <button
            className="bg-slate-100 hover:bg-slate-200 p-1 rounded-lg"
            onClick={() => navigate(section.path)}
          >
            <PiPencilSimpleLine />
          </button>
        </div>
      ))}
    </div>
  );
}

export default AddPlanting;
