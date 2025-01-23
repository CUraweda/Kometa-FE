import React, { useEffect, useState, useCallback } from 'react';
import MapComponent from "../components/maps/MapsComponent";
import { datawilayah } from '@/middleware';
import { provinces } from '@/middleware/Utils';
import { getLokasi } from '@/helper/mapsHelper';
import pin from '../assets/icon/iconMap.png'
import CustomMap, { Location } from '@/components/maps/maps';
import ModalDetail, { closeModal, openModal } from '@/components/ui/ModalDetail';
import FileUploader from '@/components/ui/fileUpload';

interface Position {
    lat: number;
    lng: number;
}

interface TambahLahanProps {
    initialPosition?: Position;
}

const AddLandPage: React.FC<TambahLahanProps> = () => {
    const [position, setPosition] = useState<Location | null>({
        lat: -6.908151,
        lng: 107.626454,

    });
    const [error, setError] = useState<string | null>(null);
    const [idWilayah, setIdWilayah] = useState<any>({
        idProvinsi: '',
        idKabupaten: '',
        idKecamatan: '',
        idDesa: '',
    });
    const [provinsi, setProvinsi] = useState<any>([]);
    const [kabupaten, setKabupaten] = useState<any>([]);
    const [kecamatan, setKecamatan] = useState<any>([]);
    const [kelurahan, setKelurahan] = useState<any>([]);
  

    const dataProvinsi = useCallback(async () => {
        try {
            const response = await datawilayah.dataProvinsi();
            setProvinsi(response?.data || []);
        } catch (error) {
            console.error("Error fetching provinsi:", error);
        }
    }, []);

    const dataKabupaten = useCallback(async () => {
        if (!idWilayah.idProvinsi) return;
        try {
            const response = await datawilayah.dataKabupaten(idWilayah.idProvinsi);
            setKabupaten(response?.data || []);
        } catch (error) {
            console.error("Error fetching kabupaten:", error);
        }
    }, [idWilayah.idProvinsi]);

    const dataKecamatan = useCallback(async () => {
        if (!idWilayah.idKabupaten) return;
        try {
            const response = await datawilayah.dataKecamatan(idWilayah.idKabupaten);
            setKecamatan(response?.data || []);
        } catch (error) {
            console.error("Error fetching kabupaten:", error);
        }
    }, [idWilayah.idKabupaten]);

    const dataKelurahan = useCallback(async () => {
        if (!idWilayah.idKecamatan) return;
        try {
            const response = await datawilayah.dataKelurahan(idWilayah.idKecamatan);
            setKelurahan(response?.data || []);
        } catch (error) {
            console.error("Error fetching kabupaten:", error);
        }
    }, [idWilayah.idKecamatan]);

    useEffect(() => {
        dataProvinsi();
    }, [dataProvinsi]);


    useEffect(() => {
        dataKabupaten();
    }, [dataKabupaten]);

    useEffect(() => {
        dataKecamatan();
    }, [dataKecamatan]);

    useEffect(() => {
        dataKelurahan();
    }, [dataKelurahan]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const lokasi = await getLokasi();
                setPosition(lokasi);
                setError(null);
            } catch (err: any) {
                setError(err.message || "Unable to retrieve location.");
            }
        };

        fetchLocation();
    }, []);
    if (!position && !error) {
        return <p>Detecting your location...</p>;
    }
    const locations = position
        ? [position]
        : [{ lat: 0, lng: 0, label: "Fallback Location" }];

  
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Tambah Lahan</h2>
                <div className="breadcrumb text-sm text-gray-500 mb-6">Lahan / Tambah Lahan</div>

                {/* Koordinat dan Dimensi Lahan */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Koordinat dan Dimensi Lahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-dashed border-2 border-gray-300 h-64 rounded-md overflow-hidden">
                            <CustomMap
                                locations={locations}
                                defaultZoom={13}
                                iconUrl={pin}
                                id={`map-${Math.random()}`} // ID unik untuk setiap instance
                            />

                        </div>
                        <div className='w-full gap-2 flex flex-col'>

                            <input
                                type="text"
                                value={position?.lng}
                                readOnly
                                placeholder="Longitude"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                value={position?.lat}
                                readOnly
                                placeholder="Latitude"
                                className="input input-bordered w-full"
                            />
                            <input type="text" placeholder="Luas" className="input input-bordered w-full"  />
                            <button className='btn btn-ghost bg-emeraldGreen text-white' onClick={() => openModal('add-lokasi')}>Edit Lokasi</button>
                        </div>
                    </div>
                </div>

                {/* Informasi Lokasi dan Status Lahan */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Informasi Lokasi dan Status Lahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" placeholder="Nama Lengkap" className="input input-bordered w-full" />
                        <select
                            className="select select-bordered w-full"
                            onChange={(e) =>
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idProvinsi: e.target.value,
                                }))
                            }
                        >
                            <option value="">Provinsi</option>
                            {provinsi?.map((value: provinces, index: number) => (
                                <option key={index} value={value.id}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className={`select select-bordered w-full ${idWilayah?.idProvinsi ? '' : 'select-disabled'}`}
                            onChange={(e) =>
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idKabupaten: e.target.value,
                                }))
                            }>
                            <option value={''}>Kota / Kabupaten</option>
                            {kabupaten?.map((value: provinces, index: number) => (
                                <option key={index} value={value.id}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className={`select select-bordered w-full ${idWilayah?.idKabupaten ? '' : 'select-disabled'}`}
                            onChange={(e) =>
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idKecamatan: e.target.value,
                                }))
                            }>
                            <option value={''}>Kecamatan</option>
                            {kecamatan?.map((value: provinces, index: number) => (
                                <option key={index} value={value.id}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className={`select select-bordered w-full ${idWilayah?.idKecamatan ? '' : 'select-disabled'}`}
                            onChange={(e) =>
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idKelurahan: e.target.value,
                                }))
                            }>
                            <option value={''}>Desa / Kelurahan</option>
                            {kelurahan?.map((value: provinces, index: number) => (
                                <option key={index} value={value.id}>
                                    {value.name}
                                </option>
                            ))}
                        </select>

                        <input type="text" placeholder="Alamat Lahan" className="input input-bordered w-full" />
                        <select className="select select-bordered w-full">
                            <option>Status Kepemilikan</option>
                        </select>
                        <select className="select select-bordered w-full">
                            <option>Kondisi Lahan</option>
                        </select>
                        <textarea placeholder="Catatan" className="textarea textarea-bordered w-full" maxLength={500}></textarea>
                    </div>
                </div>

                {/* Detail Kepemilikan Lahan */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Detail Kepemilikan Lahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='flex flex-col gap-2'>
                            <p>File Sertifikat</p>
                            <FileUploader />
                        </div>
                        <div className='flex gap-2 flex-col pt-8'>

                            <input type="text" placeholder="Nomor Sertifikat SHM" className="input input-bordered w-full" />
                            <input type="text" placeholder="Nama Lengkap Pemilik Dokumen" className="input input-bordered w-full" />
                            <input type="text" placeholder="Luas Lahan" className="input input-bordered w-full" />
                        </div>

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button className="btn btn-outline">Kembali</button>
                    <button className="btn btn-ghost bg-emeraldGreen text-white">Simpan</button>
                </div>
            </div>

            <ModalDetail id='add-lokasi' width='w-11/12 max-w-5xl p-0'>
                <MapComponent
                    position={position || { lat: 0, lng: 0 }}
                    setPosition={setPosition}
                    radius={10}
                    markerIconUrl={pin}
                />
                <div className='w-full p-5 flex justify-end gap-2'>

                    <button className='btn btn-outline text-emeraldGreen w-32' onClick={() => closeModal('add-lokasi')}>Kambali</button>
                    <button className='btn btn-ghost bg-emeraldGreen text-white w-32'>simpan</button>
                </div>

            </ModalDetail>
        </div>
    );
};

export default AddLandPage;
