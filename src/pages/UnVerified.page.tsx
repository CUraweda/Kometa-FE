import { Skeleton } from '@/components/ui/skeleton';
import { listedUser } from '@/constant/routers/listed';
import { formatDateTime, formatDateString } from '@/utils/formatDate';
import CenterLayout from '@/layout/center.layout';
import { dataMember} from '@/middleware';
import { Member } from '@/middleware/Utils';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restAnggota } from '@/middleware/Rest';
import ModalDetail, { openModal } from '@/components/ui/ModalDetail';

const UnVerifiedPage = () => {
  const [member, setMember] = useState<Member>();
  const [images, setImages] = useState<{ index: number; src: string }[]>([]);
  const [indexImage, setIndexImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkData = async () => {
    const {data} = await restAnggota.checkMember();
   
    const memberData = data.data;
  
    await loadImages(memberData.MemberFile)
    setMember(memberData)
    if(memberData.isVerified) {
        navigate(listedUser.dashboard);
    }
  };

  const handleTinjau = () => {
    const params = new URLSearchParams({
      type: 'reject',
    });

    navigate(`${listedUser.registerMember}?${params.toString()}`);
  };

  const loadImages = async (props: any) => {
    const allowedFilePaths = { ktp: true, ktp_selfie: true };
    const image = await dataMember.loadImage(props, allowedFilePaths);
    setImages(image ?? []);
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

  const handlePreview = (index: string) => {
    setIndexImage(index)
    openModal('preview-image')
  }
  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className="min-h-[calc(100vh-105px)] w-full flex justify-start flex-col items-center">
          <span className="text-3xl font-semibold">
            Selamat Datang di KOMETA
          </span>

          <div className="w-full sm:w-5/6 mt-10 p-3 rounded-md flex flex-col">
            <div className="divider divider-accent">INFORMASI</div>
            <p>
              Pendaftaran anda sebagai {member?.membershipType.name}{' '}
              <span className="font-bold">
                Koperasi Modern Teknologi Nusantara (KOMETA)
              </span>{' '}
              pada tanggal {formatDateTime(member?.createdAt)} telah
              berhasil, status pendaftaran anda adalah{' '}
              <span className="text-emeraldGreen font-bold">
                menunggu Verifikasi Admin
              </span>{' '}
              silakan tunggu konfirmasi dari admin untuk langkah selanjutnya
            </p>
            {member?.rejectedMessage && (
              <>
                <div className="w-full border border-input rounded-md p-5 mt-10 flex flex-col">
                  <span>Catatan Admin : </span>
                  {member?.rejectedMessage}
                </div>
                <button
                  className="btn btn-ghost bg-emeraldGreen text-white"
                  onClick={handleTinjau}
                >
                  Tinjau Ulang
                </button>
              </>
            )}

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-bold mt-6 mb-4">Informasi Akun</h2>
              <div className="z-0 overflow-hidden">
                <table className="table w-1/2">
                  <tr>
                    <th>Tanggal Pendaftaran</th>
                    <td>:</td>
                    <td>{formatDateTime(member?.createdAt)}</td>
                  </tr>

                  <tr>
                    <th>Whatsapp</th>
                    <td>:</td>
                    <td>{member?.user.phoneWA}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>:</td>
                    <td>{member?.user.email}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>:</td>
                    <td>
                      {member?.isVerified ? (
                        <span className="badge badge-success text-white">
                          Terverifikasi
                        </span>
                      ) : (
                        <span className="badge badge-warning">Tertunda</span>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
              <h2 className="text-lg font-bold mt-6 mb-4">Informasi Pribadi</h2>
              <div className="z-0 overflow-hidden">
                <table className="table w-full">
                  <tr>
                    <th>Nama Lengkap</th>
                    <td>:</td>
                    <td>{member?.fullName}</td>
                  </tr>
                  <tr>
                    <th>NIK</th>
                    <td>:</td>
                    <td>{member?.nik}</td>
                  </tr>
                  <tr>
                    <th>Tempat, Tanggal Lahir</th>
                    <td>:</td>
                    <td>
                      {member?.pob} , {formatDateString(member?.dob)}
                    </td>
                  </tr>
                  <tr>
                    <th>Jenis Kelamin</th>
                    <td>:</td>
                    <td>
                      {member?.gender === 'L' ? 'Laki - Laki' : 'Perempuan'}
                    </td>
                  </tr>
                  <tr>
                    <th>Pekerjaan</th>
                    <td>:</td>
                    <td>{member?.job}</td>
                  </tr>

                  <tr>
                    <th>Keanggotaan</th>
                    <td>:</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: member?.membershipType.backgroundColor,
                          color: member?.membershipType.foregroundColor,
                          padding: '5px',
                          borderRadius: '5px',
                        }}
                      >
                        {member?.membershipType.name}
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
                    <div className="w-full justify-start"></div>
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
                      <td>{member?.nik}</td>
                    </tr>
                    <tr>
                      <th>Nama Lengkap</th>
                      <td>:</td>
                      <td>{member?.fullName}</td>
                    </tr>
                    <tr>
                      <th>Jenis Kelamin</th>
                      <td>:</td>
                      <td>{member?.gender == 'L' ? 'laki-laki' : 'perempuan'}</td>
                    </tr>
                    <tr>
                      <th>Tempat Lahir</th>
                      <td>:</td>
                      <td>{member?.pob}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Lahir</th>
                      <td>:</td>
                      <td>{formatDateString(member?.dob)}</td>
                    </tr>
                  </table>
                </div>
                <div>
                  <table className="table w-1/2">
                    <tr>
                      <th>Provinsi</th>
                      <td>:</td>
                      <td>{member?.KtpProvince}</td>
                    </tr>
                    <tr>
                      <th>Kabupaten / Kota</th>
                      <td>:</td>
                      <td>{member?.KtpCity}</td>
                    </tr>
                    <tr>
                      <th>Kecamatan</th>
                      <td>:</td>
                      <td>{member?.KtpDistrict}</td>
                    </tr>
                    <tr>
                      <th>Desa/Kelurahan</th>
                      <td>:</td>
                      <td>{member?.KtpSubDistrict}</td>
                    </tr>
                    <tr>
                      <th>Detail Alamat</th>
                      <td>:</td>
                      <td>{member?.KtpAddressDetail}</td>
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
                    <td>{member?.DomicileProvince}</td>
                  </tr>
                  <tr>
                    <th>Kabupaten / Kota</th>
                    <td>:</td>
                    <td>{member?.DomicileCity}</td>
                  </tr>
                  <tr>
                    <th>Kecamatan</th>
                    <td>:</td>
                    <td>{member?.DomicileDistrict}</td>
                  </tr>
                  <tr>
                    <th>Desa/Kelurahan</th>
                    <td>:</td>
                    <td>{member?.DomicileSubDistrict}</td>
                  </tr>
                  <tr>
                    <th>Detail Alamat</th>
                    <td>:</td>
                    <td>{member?.DomicileAddressDetail}</td>
                  </tr>
                </table>
              </div>
             
            </div>
          </div>
        </div>
      </CenterLayout>
      <ModalDetail id='preview-image'>
        <div className='w-full flex flex-col gap-3'>
        <img src={indexImage} alt={`Image preview`} className="rounded border" />

        </div>

      </ModalDetail>
    </div>
  );
};

export default UnVerifiedPage;
