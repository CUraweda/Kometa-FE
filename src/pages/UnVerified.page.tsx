import { Skeleton } from '@/components/ui/skeleton';
import { listedUser } from '@/constant/routers/listed';
import { formatDateTime, formatDateString } from '@/utils/formatDate';
import { formatRupiah } from '@/utils/formatRupiah';
import CenterLayout from '@/layout/center.layout'
import { dataMember, memberRest } from '@/middleware';
import { MemberData } from '@/middleware/Utils';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UnVerifiedPage = () => {
    const [data, setData] = useState<MemberData>()
    const [images, setImages] = useState<{ index: number; src: string }[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    const checkData = async () => {
        const response = await memberRest.checkData();

        if (typeof response === 'object' && response !== null && 'data' in response) {
            const dataRest = response.data as MemberData;
            if(dataRest.data.isVerified){
                navigate(listedUser.dashboard)
            }
            setData(dataRest)
        } else {
            console.error('Invalid response structure', response);
        }
    };

    const handleTinjau = () => {
        const params = new URLSearchParams({
            type: 'reject'
        });

        navigate(`${listedUser.registerMember}?${params.toString()}`);
    }


    useEffect(() => {
        const loadImages = async () => {
            if (data?.data?.MemberFile) {
                const loadedImages = await Promise.all(
                    data.data.MemberFile.map(async (value: any, index: number) => {
                        const src = await dataMember.getFile(value.filePath); // Dapatkan URL gambar
                        return { index, src: src || "" }; // Pastikan src memiliki nilai default jika undefined
                    })
                );
                setImages(loadedImages);
            }
        };

        loadImages();

        // Cleanup URL untuk mencegah memory leak
        return () => {
            images.forEach(({ src }) => URL.revokeObjectURL(src));
        };
    }, [data]);

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

    return (
        <div>
            <CenterLayout className='min-h-[calc(100vh-105px)]'>
                <div className="min-h-[calc(100vh-105px)] w-full flex justify-start flex-col items-center">
                    <span className='text-3xl font-semibold'>Selamat Datang di KOMETA</span>

                    <div className='w-full sm:w-5/6 mt-10 p-3 rounded-md flex flex-col'>
                        <div className="divider divider-accent">INFORMASI</div>
                        <p>Pendaftaran anda sebagai {data?.data.membershipType.name} <span className='font-bold'>Koperasi Modern Teknologi Nusantara (KOMETA)</span> pada tanggal {formatDateTime(data?.data.createdAt)} telah berhasil, status pendaftaran anda adalah <span className='text-emeraldGreen font-bold'>menunggu Verifikasi Admin</span> silakan tunggu konfirmasi dari admin untuk langkah selanjutnya</p>
                        {
                            data?.data.rejectedMessage &&
                            <>
                                <div className='w-full border border-input rounded-md p-5 mt-10 flex flex-col'>
                                    <span>Catatan Admin : </span>
                                    {data?.data.rejectedMessage}
                                </div>
                                <button className='btn btn-ghost bg-emeraldGreen text-white' onClick={handleTinjau}>Tinjau Ulang</button>
                            </>
                        }

                        <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
                            <h1 className="text-xl font-bold mb-4">Detail Pengajuan Anggota</h1>
                           
                            <h2 className="text-lg font-bold mb-4">Detail Transaksi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <table className="table w-1/2">
                                    <tr >
                                        <th className="font-semibold">Pembayaran</th>
                                        <td>:</td>
                                        <td>{data?.data.registrationPaymentMethod}</td>
                                    </tr>
                                    <tr >
                                        <th className="font-semibold">Total</th>
                                        <td>:</td>
                                        <td>{formatRupiah(data?.data.registrationFee ? data?.data.registrationFee : 5000)}</td>
                                    </tr>
                                   

                                </table>

                            </div>

                            <h2 className="text-lg font-bold mt-6 mb-4">Informasi Akun</h2>
                            <div className='z-0 overflow-hidden'>

                                <table className="table w-1/2">
                                    <tr>
                                        <th>Tanggal Pendaftaran</th>
                                        <td>:</td>
                                        <td>{formatDateTime(data?.data.createdAt)}</td>
                                    </tr>
                                    <tr>
                                        <th>Whatsapp</th>
                                        <td>:</td>
                                        <td>{data?.data.user.phoneWA}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>:</td>
                                        <td>{data?.data.user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>:</td>
                                        <td>{data?.data.isVerified ? <span className="badge badge-success text-white">Terverifikasi</span> : <span className="badge badge-warning">Tertunda</span>}</td>
                                    </tr>
                                    <tr>
                                        <th>Keanggotaan</th>
                                        <td>:</td>
                                        <td><span style={{ backgroundColor: data?.data.membershipType.backgroundColor, color: data?.data.membershipType.foregroundColor, padding: '5px', borderRadius: '5px' }}>
                                            {data?.data.membershipType.name}
                                        </span></td>
                                    </tr>

                                </table>
                            </div>


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
                                        className="flex items-center mt-5"
                                    >

                                        <img src={src} alt={`Image ${index}`} className="w-96 rounded border" />
                                        <div className="w-full justify-start">
                                            {/* Tambahkan konten tambahan di sini jika diperlukan */}
                                        </div>
                                    </div>
                                ))}


                            </div>
                            <h2 className="text-lg font-bold mt-6 mb-4">Alamat KTP</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <table className='table w-1/2'>
                                        <tr>
                                            <th>NIK</th>
                                            <td>:</td>
                                            <td>{data?.data.nik}</td>
                                        </tr>
                                        <tr>
                                            <th>Nama Lengkap</th>
                                            <td>:</td>
                                            <td>{data?.data.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>Jenis Kelamin</th>
                                            <td>:</td>
                                            <td>{data?.data.gender == "L" ? "laki-laki" : "perempuan"}</td>
                                        </tr>
                                        <tr>
                                            <th>Tempat Lahir</th>
                                            <td>:</td>
                                            <td>{data?.data.pob}</td>
                                        </tr>
                                        <tr>
                                            <th>Tanggal Lahir</th>
                                            <td>:</td>
                                            <td>{formatDateString(data?.data.dob)}</td>
                                        </tr>

                                    </table>
                                </div>
                                <div>
                                    <table className='table w-1/2'>
                                        <tr>
                                            <th>Provinsi</th>
                                            <td>:</td>
                                            <td>{data?.data.KtpProvince}</td>
                                        </tr>
                                        <tr>
                                            <th>Kabupaten / Kota</th>
                                            <td>:</td>
                                            <td>{data?.data.KtpCity}</td>
                                        </tr>
                                        <tr>
                                            <th>Kecamatan</th>
                                            <td>:</td>
                                            <td>{data?.data.KtpDistrict}</td>
                                        </tr>
                                        <tr>
                                            <th>Desa/Kelurahan</th>
                                            <td>:</td>
                                            <td>{data?.data.KtpSubDistrict}</td>
                                        </tr>
                                        <tr>
                                            <th>Detail Alamat</th>
                                            <td>:</td>
                                            <td>{data?.data.KtpAddressDetail}</td>
                                        </tr>

                                    </table>
                                </div>

                            </div>

                            <h2 className="text-lg font-bold mt-6 mb-4">Alamat Domisili</h2>
                            <div>
                                <table className='table w-1/2'>
                                    <tr>
                                        <th>Provinsi</th>
                                        <td>:</td>
                                        <td>{data?.data.DomicileProvince}</td>
                                    </tr>
                                    <tr>
                                        <th>Kabupaten / Kota</th>
                                        <td>:</td>
                                        <td>{data?.data.DomicileCity}</td>
                                    </tr>
                                    <tr>
                                        <th>Kecamatan</th>
                                        <td>:</td>
                                        <td>{data?.data.DomicileDistrict}</td>
                                    </tr>
                                    <tr>
                                        <th>Desa/Kelurahan</th>
                                        <td>:</td>
                                        <td>{data?.data.DomicileSubDistrict}</td>
                                    </tr>
                                    <tr>
                                        <th>Detail Alamat</th>
                                        <td>:</td>
                                        <td>{data?.data.DomicileAddressDetail}</td>
                                    </tr>

                                </table>
                            </div>

                        </div>

                    </div>

                </div>
            </CenterLayout>
        </div>
    )
}

export default UnVerifiedPage