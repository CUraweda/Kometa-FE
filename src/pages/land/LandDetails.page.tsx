import CustomMap from "@/components/maps/maps";
import CenterLayout from "@/layout/center.layout";
import React, { useState } from "react";
import pin from "@/assets/icon/iconMap.png";
import { useNavigate } from "react-router-dom";

const LandDetails: React.FC = () => {
  const navigate = useNavigate();
  const landData = {
    message: "Alasan Ditolak",
    location: {
      longitude: -6.741592,
      latitude: 107.06194350483524,
      area: "12,78 Ha",
      mapImage: "https://via.placeholder.com/400x300",
    },
    landInfo: {
      fullName: "Putra Aksara",
      province: "DKI Jakarta",
      city: "Jakarta Barat",
      district: "Kebon Jeruk",
      village: "Kebon Jeruk",
      address: "Mutiara Berkah Tani",
      ownershipStatus: "SHM",
      landCondition: "Kosong",
      notes: "Lahan sudah tertanam komoditas jahe",
    },
    ownershipDetails: {
      documentImage:
        "https://fahum.umsu.ac.id/blog/wp-content/uploads/2024/10/syarat-membuat-sertifikat-surat-tanah-2024.jpg",
      certificateNumber: "12xxxxx",
      ownerName: "Aji xxxxx",
      landArea: "12 Ha",
    },
  };
  const [position, setPosition] = useState<any>({
    lat: -6.908151,
    lng: 107.626454,
  });
  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    console.log("Edit button clicked");
  };
  const locations = position
    ? [position]
    : [{ lat: 0, lng: 0, label: "Fallback Location" }];
  return (
    <CenterLayout className="bg-gray-200 p-5 ">
      <div className="p-6 bg-white min-h-screen max-w-4xl mx-auto  rounded-lg shadow">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Detail Lahan</h1>
        <p className="text-sm text-gray-500 mb-6">
          Lahan /{" "}
          <span className="text-gray-700 font-medium">Detail Lahan</span>
        </p>

        {/* Pesan */}
        <div className="mb-6">
          <div className="flex items-start">
            <span className="font-medium w-24">Pesan</span>
            <span className="text-gray-700">: {landData.message}</span>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Koordinat dan Dimensi Lahan */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Koordinat dan Dimensi Lahan
            </h2>
            <div className="border-dashed border-2 border-gray-300 h-64 rounded-md overflow-hidden">
              <CustomMap
                locations={locations}
                defaultZoom={13}
                iconUrl={pin}
                id={`map-${Math.random()}`} // ID unik untuk setiap instance
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Longitude</span>
                <span className="text-gray-700">
                  : {landData.location.longitude}
                </span>
              </div>
              <div>
                <span className="font-medium">Latitude</span>
                <span className="text-gray-700">
                  : {landData.location.latitude}
                </span>
              </div>
              <div>
                <span className="font-medium">Luas</span>
                <span className="text-gray-700">
                  : {landData.location.area}
                </span>
              </div>
            </div>
          </div>

          {/* Informasi Lokasi dan Status Lahan */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Informasi Lokasi dan Status Lahan
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Nama Lengkap</span>
                <span className="text-gray-700">
                  : {landData.landInfo.fullName}
                </span>
              </div>
              <div>
                <span className="font-medium">Provinsi</span>
                <span className="text-gray-700">
                  : {landData.landInfo.province}
                </span>
              </div>
              <div>
                <span className="font-medium">Kota/Kabupaten</span>
                <span className="text-gray-700">
                  : {landData.landInfo.city}
                </span>
              </div>
              <div>
                <span className="font-medium">Kecamatan</span>
                <span className="text-gray-700">
                  : {landData.landInfo.district}
                </span>
              </div>
              <div>
                <span className="font-medium">Desa/Kelurahan</span>
                <span className="text-gray-700">
                  : {landData.landInfo.village}
                </span>
              </div>
              <div>
                <span className="font-medium">Alamat Lahan</span>
                <span className="text-gray-700">
                  : {landData.landInfo.address}
                </span>
              </div>
              <div>
                <span className="font-medium">Status Kepemilikan</span>
                <span className="text-gray-700">
                  : {landData.landInfo.ownershipStatus}
                </span>
              </div>
              <div>
                <span className="font-medium">Kondisi Lahan</span>
                <span className="text-gray-700">
                  : {landData.landInfo.landCondition}
                </span>
              </div>
              <div className="col-span-2">
                <span className="font-medium">Catatan</span>
                <span className="text-gray-700">
                  : {landData.landInfo.notes}
                </span>
              </div>
            </div>
          </div>

          {/* Detail Kepemilikan Lahan */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">
              Detail Kepemilikan Lahan
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
              <div>
                <img
                  src={landData.ownershipDetails.documentImage}
                  alt="Foto Dokumen"
                  className="h-64 rounded-md"
                />
                <span className="font-medium block mt-2">Foto Dokumen</span>
              </div>
              <div>
                <div className="flex">
                  <span className="font-medium w-36">Nomor Sertifikat</span>
                  <span className="text-gray-700">
                    : {landData.ownershipDetails.certificateNumber}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium w-36">Nama Lengkap</span>
                  <span className="text-gray-700">
                    : {landData.ownershipDetails.ownerName}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium w-36">Luas Lahan</span>
                  <span className="text-gray-700">
                    : {landData.ownershipDetails.landArea}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="btn btn-outline btn-primary" onClick={handleBack}>
            Kembali
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </CenterLayout>
  );
};

export default LandDetails;
