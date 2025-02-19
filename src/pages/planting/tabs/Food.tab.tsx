const PakanTab = () => {
  const feedData = [
    {
      category: "Kode Pakan",
      pakan1: { awal: 20, akhir: 20, keterangan: "-" },
      pakan2: { awal: 20, akhir: 20, keterangan: "-" },
    },
    {
      category: "Jenis Pakan",
      pakan1: { awal: 20, akhir: 20, keterangan: "-" },
      pakan2: { awal: 20, akhir: 20, keterangan: "-" },
    },
    {
      category: "Merk Pakan",
      pakan1: { awal: "20 mm", akhir: "20 mm", keterangan: "-" },
      pakan2: { awal: "20 mm", akhir: "20 mm", keterangan: "-" },
    },
    {
      category: "Ukuran Pakan",
      pakan1: {
        awal: "20 Kg / 1 Sak",
        akhir: "20 Kg / 1 Sak",
        keterangan: "-",
      },
      pakan2: {
        awal: "20 Kg / 1 Sak",
        akhir: "20 Kg / 1 Sak",
        keterangan: "-",
      },
    },
    {
      category: "Berat Pakan",
      pakan1: {
        awal: "20 Kg / 1 Sak",
        akhir: "20 Kg / 1 Sak",
        keterangan: "-",
      },
      pakan2: {
        awal: "20 Kg / 1 Sak",
        akhir: "20 Kg / 1 Sak",
        keterangan: "-",
      },
    },
    {
      category: "Metode Pembelian Pakan",
      pakan1: { awal: 20, akhir: 20, keterangan: "-" },
      pakan2: { awal: 20, akhir: 20, keterangan: "-" },
    },
  ];

  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">Pakan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedData.map((item, index) => (
          <div key={index}>
            <h3 className="font-bold pb-1 mb-2">{item.category}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* pakan 1 */}
              <div>
                <p className="font-medium mb-3">Pakan 1 Rentang DOC</p>
                <div className="flex items-center gap-1 mb-2">
                  <label className="min-w-[160px] flex flex-wrap text-gray-500">
                    Awal
                  </label>
                  <span>: {item.pakan1.awal}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <label className="min-w-[160px] flex flex-wrap text-gray-500">
                    Akhir
                  </label>
                  <span>: {item.pakan1.akhir}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <label className="min-w-[160px] flex flex-wrap text-gray-500">
                    Keterangan
                  </label>
                  <span>: {item.pakan1.keterangan}</span>
                </div>
              </div>

              {/* pakan 2 */}
              <div>
                <p className="font-medium mb-3">Pakan 2 Rentang DOC</p>
                <div className="flex items-center gap-1 mb-2">
                  <label className="min-w-[160px] flex flex-wrap text-gray-500">
                    Awal
                  </label>
                  <span>: {item.pakan2.awal}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <label className="min-w-[160px] flex flex-wrap text-gray-500">
                    Akhir
                  </label>
                  <span>: {item.pakan2.akhir}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <label className="min-w-[160px] flex flex-wrap text-gray-500">
                    Keterangan
                  </label>
                  <span>: {item.pakan2.keterangan}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PakanTab;
