function KYCPlantingTab() {
  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">KYC Budidaya</h3>
      <div className="w-full flex gap-8 flex-wrap">
        {[
          [
            {
              label: "Jumlah Kolam Aktif yang Diajukan Pembiayaan",
              value: "10",
            },
            { label: "Data Kualitas Air?", value: "Ya" },
            { label: "Kinci", value: "10 Unit" },
            { label: "Lama Berbudidaya Udang", value: "3 Bulan" },
            { label: "Keuntungan Budidaya", value: "Rp 6.000.000" },
            { label: "Gaji Karyawan", value: "Rp 4.000.000 / Orang / Bulan" },
          ],
          [
            { label: "Apakah Memiliki SOP Budidaya", value: "Ya" },
            { label: "Data Panen?", value: "Tidak" },
            { label: "Disinfectant", value: "Formalin" },
            { label: "Biaya Produksi Budidaya", value: "Rp 7.000.000 Siklus" },
            { label: "Apakah Anda Memiliki Karyawan?", value: "Ya" },
            { label: "Total Kolam yang dikelola per Karyawan", value: "3" },
          ],
          [
            {
              label: "Memiliki Metode Pengumpulan Data Budidaya?",
              value: "Ya",
            },
            { label: "Feeder", value: "20 Unit" },
            { label: "Supplement", value: "20 Kg" },
            {
              label: "Biaya Operasional Budidaya",
              value: "Rp 3.000.000 Siklus",
            },
            { label: "Total Karyawan", value: "12" },
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
                    <label className="w-[180px] flex flex-wrap text-gray-500">
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

export default KYCPlantingTab;
