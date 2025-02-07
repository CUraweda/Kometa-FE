import React, { useEffect, useState } from 'react';
import { landApi } from '@/middleware';
import { LandData } from '@/middleware/Utils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { previewImage, restLand } from '@/middleware/Rest';
import { Skeleton } from '@/components/ui/skeleton';
import Swal from 'sweetalert2';
import getErrorMessage from '@/utils/apiHelper';
import { listedUser } from '@/constant/routers/listed';
import { LatLngTuple } from 'leaflet';
import MapView from '@/components/polygonMaps/MapsView';

interface Position {
  lat: number;
  lng: number;
}

interface TambahLahanProps {
  initialPosition?: Position;
}

const LandDetails: React.FC<TambahLahanProps> = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<LandData>();
  const [images, setImages] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLngTuple[]>(
    []
  );

  const id = searchParams.get('id');

  const getData = async () => {
    const response = await landApi.getOne(id);
    const rest: LandData = response.data.data;
    setData(rest);
    convertStringToArray(rest.arrayLocation)
    if (rest.landFile?.filePath) {
      await loadImages(rest.landFile?.filePath);
    }
  };

  const convertStringToArray = (str: string) => {
    const cleanedString = str.replace(/\"/g, "");
    const coordinatePairs = cleanedString.split("], [");
  
    const coordinatesArray: LatLngTuple[] = coordinatePairs.map(pair => {
      const [latitude, longitude] = pair
        .replace("[", "")
        .replace("]", "")
        .split(",") 
        .map(Number); 
      return [latitude, longitude]; 
    });
  
    setPolygonCoordinates(coordinatesArray)
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const getFile = async (path: string): Promise<string | undefined> => {
    try {
      const response = await previewImage.get(path);
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to load file:', error);
      return undefined;
    }
  };
  const loadImages = async (props: any) => {
    if (props) {
      const src = await getFile(props);

      setImages(src);
    }
  };

  const trigerDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await restLand.delete(id);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      });
      navigate(listedUser.land);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Lahan</h2>

        <span
          className={`badge ${
            data?.status === 'Selesai'
              ? 'badge-accent'
              : data?.status === 'Tinjau'
              ? 'badge-warning'
              : 'badge-error'
          }`}
        >
          Status : {data?.status}
        </span>

        {/* Koordinat dan Dimensi Lahan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Koordinat dan Dimensi Lahan
          </h3>
          <div className="flex w-full">
            {polygonCoordinates && 
            <MapView polygonCoordinates={polygonCoordinates} />
            }
          </div>
        </div>

        {/* Informasi Lokasi dan Status Lahan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Informasi Lokasi dan Status Lahan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={data?.ownerFullName}
              readOnly
              placeholder="Nama Lengkap"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              value={data?.ownerProvince}
              readOnly
              placeholder="Longitude"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={data?.ownerCity}
              readOnly
              placeholder="Longitude"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={data?.ownerDistrict}
              readOnly
              placeholder="Longitude"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={data?.ownerSubDistrict}
              readOnly
              placeholder="Longitude"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              value={data?.ownershipStatus}
              readOnly
              placeholder="Longitude"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={data?.landCondition}
              readOnly
              placeholder="Longitude"
              className="input input-bordered w-full"
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              value={data?.landAddress}
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              value={data?.ownerNotes}
            />
          </div>
        </div>

        {/* Detail Kepemilikan Lahan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Detail Kepemilikan Lahan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p>File Sertifikat</p>
              {loading && (
                <>
                  <Skeleton className="h-52 w-96" />
                </>
              )}
              <div className="flex items-center">
                <img
                  src={images}
                  alt={`Image `}
                  className="w-96 rounded border"
                />
                <div className="w-full justify-start">
                  {/* Tambahkan konten tambahan di sini jika diperlukan */}
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-col pt-8">
              <input
                type="text"
                value={data?.documentOwnerFullName}
                readOnly
                placeholder="Longitude"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={data?.documentShmCertificateNo}
                readOnly
                placeholder="Longitude"
                className="input input-bordered w-full"
              />
              <label htmlFor="">Luas Lahan</label>
              <input
                type="text"
                value={data?.documentWideArea}
                readOnly
                placeholder="Longitude"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="w-full border border-input p-5 rounded-md flex flex-col gap-2 my-5">
            <span>Catatan :</span>
            <span>{data?.decisionMessage || 'Tidak ada catatan'}</span>
          </div>
        </div>
        {data?.status === 'Ditolak' && (
          <div className="flex justify-start gap-3 w-full">
            <button
              className="btn btn-ghost bg-emeraldGreen text-white"
              onClick={() =>
                navigate(`/land/tambah?id=${id}&type=tinjau-lahan`)
              }
            >
              Tinjau Lahan
            </button>
          </div>
        )}

        {!data?.isAccepted && (
          <button
            className="btn btn-ghost bg-red-500 text-white"
            onClick={() => trigerDelete(data?.id ?? '')}
          >
            Hapus Lahan
          </button>
        )}
      </div>
    </div>
  );
};

export default LandDetails;
