import { useState } from "react";
import PersonalInformationTab from "./tabs/PersonalInformation.tab";
import PlantingAddressTab from "./tabs/PlantingAddress.tab";
import FasilityTab from "./tabs/Fasility.tab";
import ComodityTab from "./tabs/Comodity.tab";
import FoodTab from "./tabs/Food.tab";
import HarvestTab from "./tabs/Harvest.tab";
import KYCPlantingTab from "./tabs/KYCPlanting.tab";
import KYCPersonalTab from "./tabs/KYCPersonal.tab";
import DocumentTab from "./tabs/Document.tab";
import { useNavigate } from "react-router-dom";

function PlantingDetail() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      id: "personal",
      label: "Informasi Pribadi",
      content: PersonalInformationTab,
    },
    {
      id: "address",
      label: "Alamat Budidaya",
      content: PlantingAddressTab,
    },
    {
      id: "facility",
      label: "Fasilitas Infrastruktur",
      content: FasilityTab,
    },
    {
      id: "comodity",
      label: "Komoditas Budidaya",
      content: ComodityTab,
    },
    {
      id: "food",
      label: "Pakan",
      content: FoodTab,
    },
    {
      id: "harvest",
      label: "Panen",
      content: HarvestTab,
    },
    {
      id: "kycPlanting",
      label: "KYC Budidaya",
      content: KYCPlantingTab,
    },
    {
      id: "kycPersonal",
      label: "KYC Pribadi",
      content: KYCPersonalTab,
    },
    {
      id: "document",
      label: "Dokumen",
      content: DocumentTab,
    },
  ];

  const Content = tabs[selectedTab].content;

  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((item, index) => (
          <a
            key={item.id}
            onClick={() => setSelectedTab(index)}
            role={`truncate text-ellipsis tab ${item.id}`}
            className={` tab ${index == selectedTab ? "tab-active" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <Content />
      <div className="space-x-3 mt-7">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/planting")}
        >
          Kembali
        </button>
        <button className="btn btn-primary">Edit</button>
      </div>
    </div>
  );
}

export default PlantingDetail;
