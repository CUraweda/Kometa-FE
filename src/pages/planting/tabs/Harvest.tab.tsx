function HarvestTab() {
  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">Panen</h3>
      <div className="w-full flex gap-8 flex-wrap">
        {[
          [
            { label: "Panen Setiap", value: "3 Bulan" },
            { label: "Harga Rata - Rata", value: "Rp 19.000" },
            { label: "Nama Pembeli", value: "Pembeli A" },
            { label: "Nilai FCR", value: "10" },
          ],
          [
            { label: "Rata- Rata Tonase Panen / Kolam", value: "500 Kg" },
            { label: "Harga Terendah", value: "Rp 15.000" },
            { label: "Area Pembeli", value: "Area A" },
            { label: "Kondisi Hasil Panen", value: "Baik" },
          ],
          [
            { label: "Target Tonase Panen / Kolam", value: "800 Kg" },
            { label: "Harga Tertinggi", value: "Rp 24.000" },
            { label: "Nomor Whatsapp Pembeli", value: "08123456789" },
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

export default HarvestTab;
