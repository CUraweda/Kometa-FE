function KYCPersonalTab() {
  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">KYC Pribadi</h3>
      <div className="w-full flex gap-8 flex-wrap">
        {[
          [
            { label: "Total Aset Kendaraan Roda Dua", value: "4 Unit" },
            { label: "Lama Menempati Rumah", value: "10 Tahun" },
            { label: "Nama Lembaga Pemberi Pinjaman", value: "Bank" },
          ],
          [
            { label: "Total Aset Kendaraan Roda Empat", value: "1 Unit" },
            { label: "Apakah Anda Pernah Memiliki Pinjaman?", value: "Ya" },
            { label: "Lembaga Pemberi Pinjaman", value: "Pinjaman A" },
          ],
          [
            { label: "Status Kepemilikan Rumah", value: "Milik Sendiri" },
            { label: "Pernah Memiliki Kredit Macet?", value: "Tidak" },
            { label: "Rp Jumlah Pinjaman", value: "Rp 5.000.000" },
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

export default KYCPersonalTab;
