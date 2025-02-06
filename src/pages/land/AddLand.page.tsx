import React, { useEffect, useState } from 'react';

import { landApi } from '@/middleware';
import { LandData } from '@/middleware/Utils';
import { getLokasi } from '@/helper/mapsHelper';

import { Location } from '@/components/maps/maps';

import FileUploader from '@/components/ui/fileUpload';
import { useWilayah } from '@/hooks/dataWilayah';
import { SubmitHandler, useForm } from 'react-hook-form';
import { landSchema } from '@/useForm/land.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectLocation from '@/components/ui/SelectLocation';
import Select from '@/components/ui/select';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import { Message } from '@/components/form/error.field';
import useMemberStore from '@/store/home.store';
import { useNavigate } from 'react-router-dom';
import { listedUser } from '@/constant/routers/listed';
import Map from '@/components/polygonMaps/Maps';
import { LatLngTuple } from 'leaflet';

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
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLngTuple[]>(
    []
  );

  const [idWilayah, setIdWilayah] = useState<any>({
    idProvinsi: '',
    idKabupaten: '',
    idKecamatan: '',
    idDesa: '',
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
      ownerFullName: '',
      ownerProvince: '',
      ownerCity: '',
      ownerDistrict: '',
      ownerSubDistrict: '',
      ownershipStatus: 'SHM',
      ownerNotes: '',
      landCondition: '',
      landAddress: '',
      documentShmCertificateNo: '',
      documentOwnerFullName: '',
      documentWideArea: 0,
      status: 'Tinjau',
      arrayLocation: '',
      file_certificate: undefined,
    },
    mode: 'onChange',
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
    fetchProvinsi: fetchProvinsi,
  } = useWilayah('lahan');

  useEffect(() => {
    fetchProvinsi();
  }, [fetchProvinsi]);

  useEffect(() => {
    fetchKabupaten(idWilayah.idProvinsi);
  }, [watch('ownerProvince')]);

  useEffect(() => {
    fetchKecamatan(idWilayah.idKabupaten);
  }, [watch('ownerCity')]);

  useEffect(() => {
    fetchKelurahan(idWilayah.idKecamatan);
  }, [watch('ownerDistrict')]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const lokasi = await getLokasi();
        setPosition(lokasi);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Unable to retrieve location.');
      }
    };

    fetchLocation();
  }, []);

  if (!position && !error) {
    return <p>Detecting your location...</p>;
  }
  const kepemilikan = [
    { label: 'SHM', value: 'SHM' },
    { label: 'Girik', value: 'Girik' },
    { label: 'Kontrak/Sewa', value: 'Kontrak/Sewa' },
  ];
  const landkondisi = [
    { label: 'Kosong', value: 'Kosong' },
    { label: 'Bangunan', value: 'Bangunan' },
  ];

  const onSubmit: SubmitHandler<LandData> = async (value) => {
    await landApi.create(value);
    navigate(listedUser.land);
    reset();
  };
  const handlePolygonChange = (coordinates: LatLngTuple[]) => {
    setPolygonCoordinates(coordinates);
    convertToString(coordinates);
  };

  const convertToString = (coordinates: LatLngTuple[]) => {
    const response = `${coordinates
      .map((coord) => `"[${coord[0]}, ${coord[1]}]"`)
      .join(', ')}`;
    setValue('arrayLocation', response);
  };

  console.log(polygonCoordinates);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Tambah Lahan</h2>
        <div className="breadcrumb text-sm text-gray-500 mb-6">
          Lahan / Tambah Lahan
        </div>

        {/* Koordinat dan Dimensi Lahan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Koordinat dan Dimensi Lahan
          </h3>
          <div>
            <Map onPolygonChange={handlePolygonChange} />
          </div>
          <Message
                isError={Boolean(errors?.arrayLocation)}
                message={errors?.arrayLocation?.message || ' '}
              />
        </div>

        {/* Informasi Lokasi dan Status Lahan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Informasi Lokasi dan Status Lahan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              error={errors?.ownerFullName}
              placeholder="Nama Lengkap"
              className="w-full"
              {...register('ownerFullName')}
            />

            <SelectLocation
              data={Provinsi}
              error={errors?.ownerProvince}
              value={idWilayah?.idProvinsi}
              placeholder="Pilih Provinsi"
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedProvince = Provinsi.find(
                  (p) => p.id === selectedValue
                );

                // Simpan Nama Provinsi di useForm
                setValue('ownerProvince', selectedProvince?.name || '');
                setIdWilayah((prev: any) => ({
                  ...prev,
                  idProvinsi: selectedValue,
                  idKabupaten: '', // Reset Kabupaten saat Provinsi berubah
                  idKecamatan: '',
                  idKelurahan: '',
                }));
              }}
            />

            <SelectLocation
              data={Kabupaten}
              error={errors?.ownerCity}
              value={idWilayah?.idKabupaten}
              placeholder="Pilih Kabupaten / Kota"
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedKabupaten = Kabupaten.find(
                  (p) => p.id === selectedValue
                );

                setValue('ownerCity', selectedKabupaten?.name || ''); // Simpan Nama Kabupaten
                setIdWilayah((prev: any) => ({
                  ...prev,
                  idKabupaten: selectedValue,
                  idKecamatan: '', // Reset Kecamatan saat Kabupaten berubah
                  idKelurahan: '',
                }));
              }}
            />

            <SelectLocation
              data={Kecamatan}
              error={errors?.ownerDistrict}
              value={idWilayah?.idKecamatan}
              placeholder="Pilih Kecamatan"
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedKecamatan = Kecamatan.find(
                  (p) => p.id === selectedValue
                );

                setValue('ownerDistrict', selectedKecamatan?.name || ''); // Simpan Nama Kecamatan
                setIdWilayah((prev: any) => ({
                  ...prev,
                  idKecamatan: selectedValue,
                  idKelurahan: '', // Reset Kelurahan saat Kecamatan berubah
                }));
              }}
            />

            <SelectLocation
              data={Kelurahan}
              error={errors?.ownerSubDistrict}
              value={idWilayah?.idKelurahan}
              placeholder="Pilih Kelurahan"
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedKelurahan = Kelurahan.find(
                  (p) => p.id === selectedValue
                );

                setValue('ownerSubDistrict', selectedKelurahan?.name || ''); // Simpan Nama Kelurahan
                setIdWilayah((prev: any) => ({
                  ...prev,
                  idKelurahan: selectedValue,
                }));
              }}
            />

            <Select
              data={kepemilikan}
              className="w-full"
              placeholder="Status Kepemilikan"
              error={errors?.ownershipStatus}
              {...register('ownershipStatus')}
            />
            <Select
              data={landkondisi}
              className="w-full"
              placeholder="Kondisi Lahan"
              error={errors?.landCondition}
              {...register('landCondition')}
            />
            <TextArea
              error={errors?.landAddress}
              placeholder="Alamat Lahan"
              className="w-full"
              {...register('landAddress')}
            />
            <TextArea
              error={errors?.ownerNotes}
              placeholder="Catatan"
              className="w-full"
              {...register('ownerNotes')}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Detail Kepemilikan Lahan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p>File Sertifikat</p>
              <FileUploader
                value={watch('file_certificate') ?? undefined}
                onChange={(file) => {
                  if (file) {
                    setValue('file_certificate', file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />

              <Message
                isError={Boolean(errors?.file_certificate)}
                message={errors?.file_certificate?.message || ' '}
              />
            </div>
            <div className="flex gap-2 flex-col pt-8">
              <Input
                type="number"
                error={errors?.documentShmCertificateNo}
                placeholder="Nomor Sertifikat SHM"
                className="w-full"
                {...register('documentShmCertificateNo')}
              />
              <Input
                type="text"
                error={errors?.documentOwnerFullName}
                placeholder="Nama Lengkap Pemilik Dokumen"
                className="w-full"
                {...register('documentOwnerFullName')}
              />
              <label htmlFor="">Luas Lahan</label>
              <Input
                type="number"
                error={errors?.documentWideArea}
                placeholder="Luas Lahan"
                className="w-full"
                {...register('documentWideArea')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="btn btn-ghost bg-emeraldGreen text-white"
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLandPage;
