import ModalDetail, {
  closeModal,
  openModal,
} from '@/components/ui/ModalDetail';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateString, formatDateTime } from '@/utils/formatDate';
import { dataMember, memberRest } from '@/middleware';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Member, PaymentData } from '@/middleware/Utils';
import { formatRupiah } from '@/utils/formatRupiah';
import { paymentRest } from '@/middleware/Rest';

const DetailAnggotaBaru = () => {
  const [data, setData] = useState<Member>();
  const [images, setImages] = useState<{ index: number; src: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [textReject, setText] = useState<string>('');
  const [indexImage, setIndexImage] = useState<string>('');
  const [dataTransaksi, setDataTransaksi] = useState<PaymentData>();

  const type = searchParams.get('type');

  const id = searchParams.get('id');
  const checkData = async () => {
    if (!id) {
      console.error('No ID found in query parameters');
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
      console.error('Failed to fetch member data:', error);
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
  }, [id]);

  const loadImages = async (props: any) => {
    const allowedFilePaths = { ktp: true, ktp_selfie: true };
    const image = await dataMember.loadImage(props, allowedFilePaths);
    setImages(image ?? []);
  };

  const handleVerif = async (verify: boolean, id: string, text?: string) => {
    const payload = {
      isVerified: verify,
      rejectedMessage: text,
    };
    closeModal('reject-member');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update',
    }).then((result) => {
      if (result.isConfirmed) {
        update(payload, id);
      }
    });
  };

  const update = async (payload: any, id: string) => {
    try {
      const response = await memberRest.verifAnggota(payload, id);
      if (response) {
        await checkData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = (index: string) => {
    setIndexImage(index);
    openModal('preview-image');
  };

  const checkPayment = async (idTransaksi: string) => {
    try {
      const response = await paymentRest.getStatusPayment(idTransaksi);
      const data = response?.data?.data;
      openModal('detail-payment');
      setDataTransaksi(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePayment = async () => {
    const payload = {
      paymentType: dataTransaksi?.paymentMethod,
      idUser: data?.user.id,
    };
    try {
      await paymentRest.generatePayment(payload);
      checkPayment(dataTransaksi?.id ?? '');
    } catch (error) {
      console.log('ini jalan gk ada datanya');
    }
  };

  return (
    <div className="container ">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Anggota</h1>
        <p className="text-sm text-gray-500 mb-6">Anggota / Detail Anggota</p>

        <h2 className="text-lg font-bold mt-6 mb-4">Informasi Akun</h2>
        <div className="z-0 overflow-hidden flex">
          <table className="table w-1/2">
            <tr>
              <th>Tanggal Pendaftaran</th>
              <td>:</td>
              <td>{formatDateTime(data?.createdAt)}</td>
            </tr>

            <tr>
              <th>Whatsapp</th>
              <td>:</td>
              <td>{data?.user.phoneWA}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>:</td>
              <td>{data?.user.email}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>:</td>
              <td>
                {data?.isVerified ? (
                  <span className="badge badge-success text-white">
                    Terverifikasi
                  </span>
                ) : (
                  <span className="badge badge-warning">Tertunda</span>
                )}
              </td>
            </tr>
          </table>
          <div className="w-1/2 flex justify-end">
            <button className="btn btn-primary" onClick={() => checkPayment(data?.registrationPaymentId ?? '')}>
              Detail Pembayaran
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold mt-6 mb-4">Informasi Pribadi</h2>
        <div className="z-0 overflow-hidden">
          <table className="table w-full">
            <tr>
              <th>Nama Lengkap</th>
              <td>:</td>
              <td>{data?.fullName}</td>
            </tr>
            <tr>
              <th>NIK</th>
              <td>:</td>
              <td>{data?.nik}</td>
            </tr>
            <tr>
              <th>Tempat, Tanggal Lahir</th>
              <td>:</td>
              <td>
                {data?.pob} , {formatDateString(data?.dob)}
              </td>
            </tr>
            <tr>
              <th>Jenis Kelamin</th>
              <td>:</td>
              <td>{data?.gender === 'L' ? 'Laki - Laki' : 'Perempuan'}</td>
            </tr>
            <tr>
              <th>Pekerjaan</th>
              <td>:</td>
              <td>{data?.job}</td>
            </tr>

            <tr>
              <th>Keanggotaan</th>
              <td>:</td>
              <td>
                <span
                  style={{
                    backgroundColor: data?.membershipType.backgroundColor,
                    color: data?.membershipType.foregroundColor,
                    padding: '5px',
                    borderRadius: '5px',
                  }}
                >
                  {data?.membershipType.name}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {loading && (
            <>
              <Skeleton className="h-52 w-96" />
              <Skeleton className="h-52 w-96" />
            </>
          )}

          {images.map(({ index, src }) => (
            <div
              key={index}
              className="flex items-center mt-5 cursor-pointer"
              onClick={() => handlePreview(src)}
            >
              <img
                src={src}
                alt={`Image ${index}`}
                className="aspect-video rounded border"
              />
              <div className="w-full justify-start">
                {/* Tambahkan konten tambahan di sini jika diperlukan */}
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-lg font-bold mt-6 mb-4">Alamat KTP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <table className="table w-1/2">
              <tr>
                <th>NIK</th>
                <td>:</td>
                <td>{data?.nik}</td>
              </tr>
              <tr>
                <th>Nama Lengkap</th>
                <td>:</td>
                <td>{data?.fullName}</td>
              </tr>
              <tr>
                <th>Jenis Kelamin</th>
                <td>:</td>
                <td>{data?.gender == 'L' ? 'laki-laki' : 'perempuan'}</td>
              </tr>
              <tr>
                <th>Tempat Lahir</th>
                <td>:</td>
                <td>{data?.pob}</td>
              </tr>
              <tr>
                <th>Tanggal Lahir</th>
                <td>:</td>
                <td>{formatDateString(data?.dob)}</td>
              </tr>
            </table>
          </div>
          <div>
            <table className="table w-1/2">
              <tr>
                <th>Provinsi</th>
                <td>:</td>
                <td>{data?.KtpProvince}</td>
              </tr>
              <tr>
                <th>Kabupaten / Kota</th>
                <td>:</td>
                <td>{data?.KtpCity}</td>
              </tr>
              <tr>
                <th>Kecamatan</th>
                <td>:</td>
                <td>{data?.KtpDistrict}</td>
              </tr>
              <tr>
                <th>Desa/Kelurahan</th>
                <td>:</td>
                <td>{data?.KtpSubDistrict}</td>
              </tr>
              <tr>
                <th>Detail Alamat</th>
                <td>:</td>
                <td>{data?.KtpAddressDetail}</td>
              </tr>
            </table>
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Alamat Domisili</h2>
        <div>
          <table className="table w-1/2">
            <tr>
              <th>Provinsi</th>
              <td>:</td>
              <td>{data?.DomicileProvince}</td>
            </tr>
            <tr>
              <th>Kabupaten / Kota</th>
              <td>:</td>
              <td>{data?.DomicileCity}</td>
            </tr>
            <tr>
              <th>Kecamatan</th>
              <td>:</td>
              <td>{data?.DomicileDistrict}</td>
            </tr>
            <tr>
              <th>Desa/Kelurahan</th>
              <td>:</td>
              <td>{data?.DomicileSubDistrict}</td>
            </tr>
            <tr>
              <th>Detail Alamat</th>
              <td>:</td>
              <td>{data?.DomicileAddressDetail}</td>
            </tr>
          </table>
        </div>
        <div className="w-full border border-input p-5 rounded-md flex flex-col gap-2 my-5">
          <span>Catatan :</span>
          <span>{data?.rejectedMessage || 'Tidak ada catatan'}</span>
        </div>

        {type !== 'member' && (
          <div className="flex space-x-4 mt-6">
            <button
              className="btn btn-ghost bg-red-500 text-white"
              onClick={() => openModal('reject-member')}
            >
              Tolak
            </button>
            <button
              className="btn btn-ghost bg-emeraldGreen text-white"
              onClick={() => handleVerif(true, data?.id ?? '', '-')}
            >
              Setuju
            </button>
          </div>
        )}
      </div>

      <ModalDetail id="reject-member">
        <div className="w-full flex flex-col gap-3">
          <span>Tolak Pengajuan Anggota</span>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Catatan"
            value={textReject}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-outline text-white w-full"
            onClick={() => handleVerif(false, data?.id ?? '', textReject)}
          >
            Simpan
          </button>
        </div>
      </ModalDetail>
      <ModalDetail id="preview-image">
        <div className="w-full flex flex-col gap-3">
          <img
            src={indexImage}
            alt={`Image preview`}
            className="rounded border"
          />
        </div>
      </ModalDetail>
      <ModalDetail id="detail-payment">
        <span className="text-lg font-bold">Detail Transaksi</span>
        <div className="mt-5">
          <table className="table w-full">
            <tr>
              <td>ID Transaksi</td>
              <td>:</td>
              <td>{dataTransaksi?.transactionId}</td>
            </tr>
            <tr>
              <td>Tanggal Dibuat</td>
              <td>:</td>
              <td>{formatDateTime(dataTransaksi?.createdAt)}</td>
            </tr>
            <tr>
              <td>Tanggal Kadaluarsa</td>
              <td>:</td>
              <td>{formatDateTime(dataTransaksi?.expiredDate)}</td>
            </tr>
            <tr>
              <td>Tanggal Dibayar</td>
              <td>:</td>
              <td>
                {dataTransaksi?.paymentDate
                  ? formatDateTime(dataTransaksi?.paymentDate)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>:</td>
              <td>{dataTransaksi?.purpose}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td>:</td>
              <td>{dataTransaksi?.isPaid ? 'Lunas' : 'Belum Dibayar'}</td>
            </tr>
            <tr>
              <td>Metode Bayar</td>
              <td>:</td>
              <td>{dataTransaksi?.paymentMethod}</td>
            </tr>
            <tr>
              <td>Nominal</td>
              <td>:</td>
              <td>{formatRupiah(dataTransaksi?.paymentTotal ?? 0)}</td>
            </tr>
            <tr
              className={
                dataTransaksi?.paymentMethod === 'QRIS' ? 'hidden' : ''
              }
            >
              <td>Nomor Pembayaran</td>
              <td>:</td>
              <td>{dataTransaksi?.virtualAccountNo}</td>
            </tr>
          </table>

          <div
            className={
              dataTransaksi?.paymentMethod === 'QRIS'
                ? dataTransaksi.isPaid
                  ? 'hidden'
                  : new Date(dataTransaksi.expiredDate) < new Date()
                  ? 'hidden'
                  : ''
                : 'hidden'
            }
          >
            <img src={dataTransaksi?.qrisLink} alt="" />
          </div>

          <div
            className={
              dataTransaksi?.isPaid ||
              (dataTransaksi?.expiredDate &&
                new Date(dataTransaksi.expiredDate) > new Date())
                ? 'hidden'
                : ''
            }
          >
            <button
              className="btn btn-primary text-white w-full"
              onClick={generatePayment}
            >
              Generate Ulang Pembayaran
            </button>
          </div>
        </div>
      </ModalDetail>
    </div>
  );
};

export default DetailAnggotaBaru;
