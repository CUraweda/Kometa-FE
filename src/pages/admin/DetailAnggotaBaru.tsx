import { Skeleton } from '@/components/ui/skeleton';
import { formatDateString, formatDateTime } from '@/helper/formatDate';
import { memberRest } from '@/middleware';
import { previewImage } from '@/middleware/Rest';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const DetailAnggotaBaru = () => {
  const [data, setData] = useState<any>()
  const [images, setImages] = useState<{ index: number; src: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  const checkData = async () => {
    const id = searchParams.get("id");

    if (!id) {
      console.error("No ID found in query parameters");
      return;
    }

    try {
      const response = await memberRest.getById(id);
      const memberData = response.data.data;

      setData(memberData);

      if (memberData.MemberFile) {
        await loadImages(memberData.MemberFile);
      }
    } catch (error) {
      console.error("Failed to fetch member data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await checkData();
      setLoading(false);
    };

    fetchData();

    // Cleanup URL Blob
    return () => {
      images.forEach(({ src }) => URL.revokeObjectURL(src));
    };
  }, []);

  const getFile = async (path: string): Promise<string | undefined> => {
    try {
      const response = await previewImage.get(path);
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Failed to load file:", error);
      return undefined;
    }
  };
  const loadImages = async (props: any) => {
    if (props) {
      const loadedImages = await Promise.all(
        props.map(async (value: any, index: number) => {
          const src = await getFile(value.filePath);
          return { index, src: src || "" };
        })
      );
      setImages(loadedImages);
    }
  };

  const handleVerif = async (verify: boolean, id: string, text?: string) => {
    const payload = {
      isVerified: verify,
      rejectedMessage: text
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update"
    }).then((result) => {
      if (result.isConfirmed) {
        update(payload, id)
      }
    });

  }

  const update = async (payload: any, id: string) => {
    try {
      const response = await memberRest.verifAnggota(payload, id)
      if (response) {

        await checkData()
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Anggota</h1>
        <p className="text-sm text-gray-500 mb-6">Anggota / Detail Anggota</p>

        <h2 className="text-lg font-bold mb-4">Detail Transaksi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Pembayaran:</span> VA BNI</p>
          </div>

        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Informasi Akun</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Tanggal Pendaftaran : </span> {formatDateTime(data?.createdAt)}</p>
            <p><span className="font-semibold">WhatsApp : </span>{data?.user.phoneWA}</p>
            <p><span className="font-semibold">Email : </span>{data?.user.email} {data?.isVerified}</p>
            <p><span className="font-semibold">Status:</span> {data?.isVerified ? <span className="badge badge-success text-white">Terverifikasi</span> : <span className="badge badge-warning">Tertunda</span>}</p>
          </div>
          <div>
            <p><span className="font-semibold">Keanggotaan : </span> {data?.membershipType.name}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Alamat KTP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {loading &&
            <>
              <Skeleton className="h-52 w-96" />
              <Skeleton className="h-52 w-96" />
            </>
          }

          {images.map(({ index, src }) => (
            <div
              key={index}
              className="flex items-center space-x-4"
            >
              <img src={src} alt={`Image ${index}`} className="w-96 rounded border" />
              <div className="w-full justify-start">
                {/* Tambahkan konten tambahan di sini jika diperlukan */}
              </div>
            </div>
          ))}


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p><span className="font-semibold">NIK:</span>{data?.nik}</p>
            <p><span className="font-semibold">Nama Lengkap:</span>{data?.fullName}</p>
            <p><span className="font-semibold">Jenis Kelamin:</span> {data?.gender == "L" ? "laki-laki" : "perempuan"}</p>
            <p><span className="font-semibold">Tempat Lahir:</span>{data?.pob}</p>
          </div>
          <div>
            <p><span className="font-semibold">Tanggal Lahir:</span>{formatDateString(data?.dob)}</p>
            <p><span className="font-semibold">Provinsi:</span> {data?.KtpProvince} </p>
            <p><span className="font-semibold">Kota/Kabupaten:</span> {data?.KtpCity} </p>
            <p><span className="font-semibold">Kecamatan:</span>{data?.KtpDistrict}</p>
            <p><span className="font-semibold">Desa/Kelurahan:</span>{data?.KtpSubDistrict}</p>
            <p><span className="font-semibold">Detail Alamat:</span>{data?.KtpAddressDetail}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Alamat Domisili</h2>
        <div>
          <p><span className="font-semibold">Provinsi:</span> {data?.DomicileProvince}</p>
          <p><span className="font-semibold">Kota/Kabupaten:</span>{data?.DomicileCity}</p>
          <p><span className="font-semibold">Kecamatan:</span>{data?.DomicileDistrict}</p>
          <p><span className="font-semibold">Desa/Kelurahan:</span>{data?.DomicileSubDistrict}</p>
          <p><span className="font-semibold">Detail Alamat:</span>{data?.DomicileAddressDetail}</p>
        </div>

        <div className="flex space-x-4 mt-6">
          <button className="btn btn-error text-white" onClick={() => handleVerif(false, data?.id, 'ditolak')}>Tolak</button>
          <button className="btn btn-success text-white" onClick={() => handleVerif(true, data?.id)}>Setuju</button>
        </div>
      </div>
    </div>
  );
};

export default DetailAnggotaBaru;
