function ComodityTab() {
  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">Komoditas Budaya</h3>
      <div className="w-full flex gap-8 flex-wrap">
        {[
          [
            { label: "Versifikasi Budidaya", value: "Ya" },
            { label: "Jenis Kolam", value: "Tanah" },
            { label: "Rata-rata Ukuran Kolam", value: "40 m2" },
            { label: "Ketinggian Air Kolam", value: "100 m" },
            { label: "Perkiraan Tebar Benur", value: "12.000 Ekor" },
            { label: "Umur Kolam / Tambak", value: "3 Tahun" },
          ],
          [
            { label: "Jenis Budidaya", value: "Udang" },
            { label: "Total Kolam", value: "10" },
            {
              label: "Ukuran Kolam Terkecil (P x L)",
              value: "80 x 120 m",
            },
            { label: "Kapasitas per Kolam", value: "5.000 Ekor" },
            { label: "Lama Masa Siklus Budidaya", value: "3 Bulan" },
            { label: "Riwayat Penyakit di Kolam", value: "Tidak Ada" },
          ],
          [
            { label: "Nama Komoditas", value: "Komoditas A" },
            { label: "Total Kolam Aktif", value: "8" },
            { label: "Kedalaman Kolam", value: "120 m" },
            { label: "Harga Benur per Ekor", value: "Rp 3.000" },
            { label: "Status Kepemilikan Kolam", value: "Milik Sendiri" },
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
                    className="flex items-center gap-1 mb-1"
                    key={`row-${index}`}
                  >
                    <label className="min-w-[180px] flex flex-wrap text-gray-500">
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
  );
}

export default ComodityTab;
