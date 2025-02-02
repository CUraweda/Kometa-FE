function PersonalInformationTab() {
  return (
    <div className="w-full">
      <div className="w-full">
        <h3 className="mt-8 mb-2 font-semibold">Informasi Pribadi</h3>
        <div className="w-full flex gap-8 flex-wrap">
          {[
            [
              { label: "Nama Lengkap", value: "Johnathan Smith" },
              { label: "Nama Bank", value: "Bank Mandiri" },
              { label: "Jenis Kelamin", value: "Pria" },
              { label: "Tempat Lahir", value: "Jakarta" },
              { label: "Provinsi", value: "DKI Jakarta" },
              { label: "Desa / Kelurahan", value: "Kelurahan Gambir" },
            ],
            [
              { label: "Email", value: "john.smith@email.com" },
              { label: "Nomor Whatsapp", value: "0812-3456-7890" },
              { label: "Agama", value: "Kristen" },
              { label: "Tanggal Lahir", value: "15 Agustus 1990" },
              { label: "Kota / Kabupaten", value: "Jakarta Pusat" },
              { label: "Kode POS", value: "10110" },
            ],
            [
              { label: "NIK", value: "123456789012345" },
              { label: "NPWP", value: "1234567890123456" },
              { label: "Status Perkawinan", value: "Belum Menikah" },
              { label: "Pendidikan Terakhir", value: "S1 Teknik Informatika" },
              { label: "Kecamatan", value: "Gambir" },
              { label: "Detail Alamat", value: "Jl. Merdeka No. 1, Jakarta" },
            ],
          ].map((column, index) => {
            return (
              <div
                className="flex-1 flex flex-col gap-2 text-sm"
                key={`column-${index}`}
              >
                {column.map((row, index) => {
                  return (
                    <div
                      className="flex items-center gap-1"
                      key={`row-${index}`}
                    >
                      <label className="min-w-[150px] text-gray-500">
                        {row.label}
                      </label>
                      <span>: {row.value || "-"}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <h3 className="mt-8 mb-2 font-semibold">Alamat Domisili</h3>
        <div className="w-full flex gap-8 flex-wrap">
          {[
            [
              { label: "Provinsi", value: "DKI Jakarta" },
              { label: "Desa / Kelurahan", value: "Kelurahan Gambir" },
            ],
            [
              { label: "Kota / Kabupaten", value: "Jakarta Pusat" },
              { label: "Kode POS", value: "10110" },
            ],
            [
              { label: "Kecamatan", value: "Gambir" },
              { label: "Detail Alamat", value: "Jl. Merdeka No. 1, Jakarta" },
            ],
          ].map((column, index) => {
            return (
              <div
                className="flex-1 flex flex-col gap-2 text-sm"
                key={`column-${index}`}
              >
                {column.map((row, index) => {
                  return (
                    <div
                      className="flex items-center gap-1"
                      key={`row-${index}`}
                    >
                      <label className="min-w-[150px] text-gray-500">
                        {row.label}
                      </label>
                      <span>: {row.value || "-"}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <h3 className="mt-8 mb-2 font-semibold">Jenis Pekerjaan</h3>
        <div className="w-full flex gap-8 flex-wrap">
          <div className="flex-1 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-1">
              <label className="min-w-[150px] text-gray-500">
                Jenis Pekerjaan
              </label>
              <span>: Pemerintahan</span>
            </div>
          </div>
        </div>
        <h3 className="mt-8 mb-2 font-semibold">Model Budidaya</h3>
        <div className="w-full flex gap-8 flex-wrap">
          {[
            [{ label: "Model Bisnis Budidaya", value: "Perusaan" }],
            [{ label: "Peran Dalam Bisnis Budidaya", value: "Pemilik" }],
            [{ label: "Nama Perusahaan / Kelompok Tani", value: "Perusaan A" }],
          ].map((column, index) => {
            return (
              <div
                className="flex-1 flex flex-col gap-2 text-sm"
                key={`column-${index}`}
              >
                {column.map((row, index) => {
                  return (
                    <div
                      className="flex items-start gap-1"
                      key={`row-${index}`}
                    >
                      <label className="max-w-[150px] text-wrap text-gray-500">
                        {row.label}
                      </label>
                      <span>: {row.value || "-"}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationTab;
