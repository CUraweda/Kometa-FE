// Install dependencies: npm install react react-dom vite typescript tailwindcss daisyui
// Make sure Tailwind CSS is set up in your Vite project

import React from 'react';

const InformasiAnggota = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Informasi Akun</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Tanggal Pendaftaran:</span> 20 Jan 2024, 19.00</p>
            <p><span className="font-semibold">WhatsApp:</span> 62 812 3456 7890</p>
            <p><span className="font-semibold">Email:</span> andi.setiawan@example.com</p>
          </div>
          <div>
            <p><span className="font-semibold">Keanggotaan:</span> Anggota Pemilik Jasa</p>
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Alamat KTP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/path-to-ktp-image.jpg"
              alt="Foto KTP"
              className="w-24 h-16 rounded border"
            />
            <p>Foto KTP</p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="/path-to-selfie-image.jpg"
              alt="Foto Selfie KTP"
              className="w-24 h-16 rounded border"
            />
            <p>Foto Selfie KTP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p><span className="font-semibold">NIK:</span> 3172021201990001</p>
            <p><span className="font-semibold">Nama Lengkap:</span> Putra Aksara</p>
            <p><span className="font-semibold">Jenis Kelamin:</span> Pria</p>
            <p><span className="font-semibold">Tempat Lahir:</span> DKI Jakarta</p>
          </div>
          <div>
            <p><span className="font-semibold">Tanggal Lahir:</span> 23 Januari 1987</p>
            <p><span className="font-semibold">Provinsi:</span> DKI Jakarta</p>
            <p><span className="font-semibold">Kecamatan:</span> Kebon Jeruk</p>
            <p><span className="font-semibold">Desa/Kelurahan:</span> Kebon Jeruk</p>
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Alamat Domisili</h2>
        <div>
          <p><span className="font-semibold">Provinsi:</span> DKI Jakarta</p>
          <p><span className="font-semibold">Kota/Kabupaten:</span> Jakarta Barat</p>
          <p><span className="font-semibold">Kecamatan:</span> Kebon Jeruk</p>
          <p><span className="font-semibold">Detail Alamat:</span> Jl. Mawar No. 25, RT 002 / RW 005</p>
        </div>

        <div className="mt-6">
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default InformasiAnggota;
