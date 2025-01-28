import { formatDateTime, formatDateString } from '@/helper/formatDate';
import CenterLayout from '@/layout/center.layout'
import { dataMember, memberRest } from '@/middleware';
import { previewImage } from '@/middleware/Rest';
import { MemberData } from '@/middleware/Utils';

import React, { useEffect, useState } from 'react'

const UnVerifiedPage = () => {
    const [data, setData] = useState<MemberData>()
    const [images, setImages] = useState<{ index: number; src: string }[]>([]);

    const checkData = async () => {
        const response = await memberRest.checkData();

        if (typeof response === 'object' && response !== null && 'data' in response) {
            const dataRest = response.data as MemberData;
            setData(dataRest)
        } else {
            console.error('Invalid response structure', response);
        }
    };

    useEffect(() => {
        checkData()
    }, []);



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

    return (
        <div>
            <CenterLayout className='min-h-[calc(100vh-105px)]'>
                <div className="min-h-[calc(100vh-105px)] w-full flex justify-start flex-col items-center">
                    <span className='text-3xl font-semibold'>Selamat Datang di KOMETA</span>

                    <div className='w-full sm:w-5/6 mt-10 p-3 rounded-md flex flex-col'>
                        <div className="divider divider-accent">INFORMASI</div>
                        <p>Pendaftaran anda sebagai {data?.data.membershipType.name} <span className='font-bold'>Koperasi Modern Teknologi Nusantara (KOMETA)</span> pada tanggal {formatDateTime(data?.data.createdAt)} telah berhasil, status pendaftaran anda adalah <span className='text-emeraldGreen font-bold'>menunggu Verifikasi Admin</span> silakan tunggu konfirmasi dari admin untuk langkah selanjutnya</p>

                        <div className="container mx-auto p-4 mt-5">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h1 className="text-xl font-bold mb-4">Detail Pengajuan Data Anggota</h1>



                                <h2 className="text-lg font-bold mt-6 mb-4">Informasi Akun</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p><span className="font-semibold">Tanggal Pendaftaran:</span> {formatDateTime(data?.data.createdAt)}</p>
                                        <p><span className="font-semibold">WhatsApp:</span>{data?.data.user.phoneWA}</p>
                                        <p><span className="font-semibold">Email:</span>{data?.data.user.email}</p>
                                    </div>
                                    <div>
                                        <p><span className="font-semibold">Keanggotaan:</span> {data?.data.membershipType.name}</p>
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold mt-6 mb-4">Alamat KTP</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
                                        <p><span className="font-semibold">NIK:</span>{data?.data.nik}</p>
                                        <p><span className="font-semibold">Nama Lengkap:</span>{data?.data.fullName}</p>
                                        <p><span className="font-semibold">Jenis Kelamin:</span> {data?.data.gender == "L" ? "laki-laki" : "perempuan"}</p>
                                        <p><span className="font-semibold">Tempat Lahir:</span>{data?.data.pob}</p>
                                    </div>
                                    <div>
                                        <p><span className="font-semibold">Tanggal Lahir:</span>{formatDateString(data?.data.dob)}</p>
                                        <p><span className="font-semibold">Provinsi:</span> {data?.data.KtpProvince} </p>
                                        <p><span className="font-semibold">Kota/Kabupaten:</span> {data?.data.KtpCity} </p>
                                        <p><span className="font-semibold">Kecamatan:</span>{data?.data.KtpDistrict}</p>
                                        <p><span className="font-semibold">Desa/Kelurahan:</span>{data?.data.KtpSubDistrict}</p>
                                        <p><span className="font-semibold">Detail Alamat:</span>{data?.data.KtpAddressDetail}</p>
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold mt-6 mb-4">Alamat Domisili</h2>
                                <div>
                                    <p><span className="font-semibold">Provinsi:</span> {data?.data.DomicileProvince}</p>
                                    <p><span className="font-semibold">Kota/Kabupaten:</span>{data?.data.DomicileCity}</p>
                                    <p><span className="font-semibold">Kecamatan:</span>{data?.data.DomicileDistrict}</p>
                                    <p><span className="font-semibold">Desa/Kelurahan:</span>{data?.data.DomicileSubDistrict}</p>
                                    <p><span className="font-semibold">Detail Alamat:</span>{data?.data.DomicileAddressDetail}</p>
                                </div>


                            </div>
                        </div>
                       
                    </div>

                </div>
            </CenterLayout>
        </div>
    )
}

export default UnVerifiedPage