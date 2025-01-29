import React, { useEffect, useState,} from 'react';
import MapComponent from "../components/maps/MapsComponent";
import { landApi } from '@/middleware';
import { LandData } from '@/middleware/Utils';
import { getLokasi, getNamaWilayah } from '@/helper/mapsHelper';
import pin from '../assets/icon/iconMap.png'
import CustomMap, { Location } from '@/components/maps/maps';
import ModalDetail, { closeModal, openModal } from '@/components/ui/ModalDetail';
import FileUploader from '@/components/ui/fileUpload';
import { useWilayah } from "@/hooks/dataWilayah";
import { SubmitHandler, useForm } from 'react-hook-form';
import { landSchema } from '@/schema/land.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectLocation from '@/components/ui/SelectLocation';
import Select from '@/components/ui/select';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import { Message } from '@/components/form/error.field';
import useMemberStore from '@/store/home.store';
import { useNavigate } from 'react-router-dom';
import { listedUser } from '@/constant/routers/listed';

interface Position {
    lat: number;
    lng: number;
}

interface TambahLahanProps {
    initialPosition?: Position;
}

const AddLandPage: React.FC<TambahLahanProps> = () => {
    const { idMember } = useMemberStore();
    const navigate = useNavigate();
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
        namaWilayah: ''
    });


    const {
        register,
        setValue,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<LandData>({
        defaultValues: {
            memberId: idMember ? idMember : '',
            longitudeArea: position?.lng ?? 0,
            latitudeArea: position?.lat ?? 0,
            wideArea: 0,
            ownerFullName: "",
            ownerProvince: "",
            ownerCity: "",
            ownerDistrict: "",
            ownerSubDistrict: "",
            ownershipStatus: "SHM",
            ownerNotes: "",
            landCondition: "",
            landAddress: "",
            documentShmCertificateNo: "",
            documentOwnerFullName: "",
            documentWideArea: 0,
            status: "Tinjau",
            file: undefined, //
        },
        mode: "onChange",
        resolver: yupResolver(landSchema), 
    });

    const {
        provinsi: Provinsi,
        kabupaten: Kabupaten,
        kecamatan: Kecamatan,
        kelurahan: Kelurahan,
        fetchKabupaten: fetchKabupaten,
        fetchKecamatan: fetchKecamatan,
        fetchKelurahan: fetchKelurahan,
        fetchProvinsi: fetchProvinsi
    } = useWilayah('lahan');

    useEffect(() => {
        fetchProvinsi();
    }, [fetchProvinsi]);

    useEffect(() => {
        fetchKabupaten(idWilayah.idProvinsi);
    }, [watch("ownerProvince")])

    useEffect(() => {

        fetchKecamatan(idWilayah.idKabupaten);
    }, [watch("ownerCity")]);

    useEffect(() => {
        fetchKelurahan(idWilayah.idKecamatan);
    }, [watch("ownerDistrict")]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const lokasi = await getLokasi();
                setPosition(lokasi);
                setError(null);
                getWilayah(lokasi.lat, lokasi.lng)
            } catch (err: any) {
                setError(err.message || "Unable to retrieve location.");
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        getWilayah(position?.lat, position?.lng)
    }, [position]);


    const getWilayah = async (lat: any, lng: any) => {
        const response = await getNamaWilayah(lat, lng)
        setIdWilayah((prev: any) => ({
            ...prev,
            namaWilayah: response
        }))
        setValue("landAddress", response || "");
    }

    if (!position && !error) {
        return <p>Detecting your location...</p>;
    }
    const locations = position
        ? [position]
        : [{ lat: 0, lng: 0, label: "Fallback Location" }];

    const kepemilikan = [
        { label: "SHM", value: "SHM" },
        { label: "Girik", value: "Girik" },
        { label: "Kontrak/Sewa", value: "Kontrak/Sewa" },

    ];
    const landkondisi = [
        { label: "Kosong", value: "Kosong" },
        { label: "Bangunan", value: "Bangunan" },


    ];

    const onSubmit: SubmitHandler<LandData> = (value) => {   
        landApi.create(value)
        navigate(listedUser.land)
        reset()
    };

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
                            <span>{idWilayah.namaWilayah}</span>
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
                            <label htmlFor="">Luas</label>
                            <Input
                                type="number"
                                error={errors?.wideArea}
                                placeholder="Luas Lahan"
                                className="w-full"
                                {...register("wideArea")}
                            />
                            <button className='btn btn-ghost bg-emeraldGreen text-white' onClick={() => openModal('add-lokasi')}>Edit Lokasi</button>
                        </div>
                    </div>
                </div>

                {/* Informasi Lokasi dan Status Lahan */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Informasi Lokasi dan Status Lahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            type="text"
                            error={errors?.ownerFullName}
                            placeholder="Nama Lengkap"
                            className="w-full"
                            {...register("ownerFullName")}
                        />

                        <SelectLocation
                            data={Provinsi}
                            error={errors?.ownerProvince}
                            value={idWilayah?.idProvinsi}
                            placeholder="Pilih Provinsi"
                            {...register("ownerProvince", {
                                onChange: (e) => {
                                    const selectedValue = e.target.value;
                                    const selectedProvince = Provinsi.find((p) => p.id === selectedValue);
                                    setIdWilayah((prev: any) => ({
                                        ...prev,
                                        idProvinsi: selectedValue
                                    }))
                                    setValue("ownerProvince", selectedProvince?.name || "");
                                },
                            })}
                            onChangeCallback={(value) => {
                                const selectedProvince = Provinsi.find((p) => p.id === value);
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idProvinsi: value
                                }))
                                setValue("ownerProvince", selectedProvince?.name || "");
                            }}
                        />
                        <SelectLocation
                            data={Kabupaten}
                            error={errors?.ownerCity}
                            value={idWilayah?.idKabupaten}
                            placeholder="Pilih Kabupaten / Kota"
                            {...register("ownerCity", {
                                onChange: (e) => {
                                    const selectedValue = e.target.value;
                                    const selectedName = Kabupaten.find((p) => p.id === selectedValue);
                                    setIdWilayah((prev: any) => ({
                                        ...prev,
                                        idKabupaten: selectedValue
                                    }))
                                    setValue("ownerCity", selectedName?.name || "");
                                },
                            })}
                            onChangeCallback={(value) => {
                                const selectedName = Kabupaten.find((p) => p.id === value);
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idKabupaten: value
                                }))
                                setValue("ownerCity", selectedName?.name || "");
                            }}
                        />
                        <SelectLocation
                            data={Kecamatan}
                            error={errors?.ownerDistrict}
                            value={idWilayah?.idKecamatan}
                            placeholder="Pilih Kecamatan"
                            {...register("ownerDistrict", {
                                onChange: (e) => {
                                    const selectedValue = e.target.value;
                                    const selectedName = Kecamatan.find((p) => p.id === selectedValue);
                                    setIdWilayah((prev: any) => ({
                                        ...prev,
                                        idKecamatan: selectedValue
                                    }))
                                    setValue("ownerDistrict", selectedName?.name || "");
                                },
                            })}
                            onChangeCallback={(value) => {
                                const selectedName = Kecamatan.find((p) => p.id === value);
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idKecamatan: value
                                }))
                                setValue("ownerDistrict", selectedName?.name || "");
                            }}
                        />
                        <SelectLocation
                            data={Kelurahan}
                            error={errors?.ownerSubDistrict}
                            value={idWilayah?.idKelurahan}
                            placeholder="Pilih Kelurahan"
                            {...register("ownerSubDistrict", {
                                onChange: (e) => {
                                    const selectedValue = e.target.value;
                                    const selectedName = Kelurahan.find((p) => p.id === selectedValue);
                                    setIdWilayah((prev: any) => ({
                                        ...prev,
                                        idKelurahan: selectedValue
                                    }))
                                    setValue("ownerSubDistrict", selectedName?.name || "");
                                },
                            })}
                            onChangeCallback={(value) => {
                                const selectedName = Kelurahan.find((p) => p.id === value);
                                setIdWilayah((prev: any) => ({
                                    ...prev,
                                    idKelurahan: value
                                }))
                                setValue("ownerSubDistrict", selectedName?.name || "");
                            }}
                        />

                        <Select
                            data={kepemilikan}
                            className="w-full"
                            placeholder="Status Kepemilikan"
                            error={errors?.ownershipStatus}
                            {...register("ownershipStatus")}
                        />
                        <Select
                            data={landkondisi}
                            className="w-full"
                            placeholder="Kondisi Lahan"
                            error={errors?.landCondition}
                            {...register("landCondition")}
                        />
                        <TextArea
                            error={errors?.landAddress}
                            placeholder="Alamat Lahan"
                            className="w-full"
                            {...register("landAddress")}
                        />
                        <TextArea
                            error={errors?.ownerNotes}
                            placeholder="Catatan"
                            className="w-full"
                            {...register("ownerNotes")}
                        />
                    </div>
                </div>

                {/* Detail Kepemilikan Lahan */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Detail Kepemilikan Lahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='flex flex-col gap-2'>
                            <p>File Sertifikat</p>
                            <FileUploader
                                value={watch("file") ?? undefined} 
                                onChange={(file) => {
                                    if (file) setValue("file", file); 
                                }}
                            />

                            <Message
                                isError={Boolean(errors?.file)}
                                message={errors?.file?.message || " "}
                            />
                        </div>
                        <div className='flex gap-2 flex-col pt-8'>
                            <Input
                                type="number"
                                error={errors?.documentShmCertificateNo}
                                placeholder="Nomor Sertifikat SHM"
                                className="w-full"
                                {...register("documentShmCertificateNo")}
                            />
                            <Input
                                type="text"
                                error={errors?.documentOwnerFullName}
                                placeholder="Nama Lengkap Pemilik Dokumen"
                                className="w-full"
                                {...register("documentOwnerFullName")}
                            />
                            <label htmlFor="">Luas Lahan</label>
                            <Input
                                type="number"
                                error={errors?.documentWideArea}
                                placeholder="Luas Lahan"
                                className="w-full"
                                {...register("documentWideArea")}
                            />
                        </div>

                    </div>
                </div>


                <div className="flex justify-end gap-3">

                    <button className="btn btn-ghost bg-emeraldGreen text-white" onClick={handleSubmit(onSubmit)}>Simpan</button>
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

                    <button className='btn btn-outline text-white bg-emeraldGreen w-32' onClick={() => closeModal('add-lokasi')}>Simpan</button>

                </div>

            </ModalDetail>
        </div>
    );
};

export default AddLandPage;
