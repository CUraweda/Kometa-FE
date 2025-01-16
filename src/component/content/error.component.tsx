import CenterLayout from "../../layout/center.layout";

function Error() {
  return (
    <CenterLayout>
      <div className="max-w-2xl text-center space-y-4">
        <h3 className="text-4xl font-medium">Halaman Tidak Ditemukan</h3>
        <p className="text-gray-500">
          Halaman yang Anda coba akses tidak tersedia. <br />
          Mohon periksa kembali URL yang dimasukkan, atau gunakan navigasi{" "}
          <br />
          untuk menemukan informasi yang Anda cari. Jika masalah berlanjut,{" "}
          <br />
          hubungi tim dukungan kami untuk bantuan lebih lanjut.
        </p>
        <p></p>
      </div>
    </CenterLayout>
  );
}

export default Error;
