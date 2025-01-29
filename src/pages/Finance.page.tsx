import CardFinance from "@/components/shared/cardFinance";
import Input from "@/components/ui/input";
import CenterLayout from "../layout/center.layout";

function FinancePage() {
  const cards = [
    {
      total: 100000,
      status: "Belum Dibayar",
      name: "Pendaftaran",
      tempo: "20 januari 2025",
      tanggalBayar: "20 januari 2025",
      methodeBayar: "Bank BCA",
      transaksiId: "TRX-001",
    },
    {
      total: 100000,
      status: "Belum Dibayar",
      name: "Pendaftaran",
      tempo: "20 januari 2025",
      tanggalBayar: "20 januari 2025",
      methodeBayar: "Bank BCA",
      transaksiId: "TRX-001",
    },
    {
      total: 100000,
      status: "Belum Dibayar",
      name: "Pendaftaran",
      tempo: "20 januari 2025",
      tanggalBayar: "20 januari 2025",
      methodeBayar: "Bank BCA",
      transaksiId: "TRX-001",
    },
  ];
  const cardsLunas = [
    {
      total: 100000,
      status: "Lunas",
      name: "Pendaftaran",
      tempo: "20 januari 2025",
      tanggalBayar: "20 januari 2025",
      methodeBayar: "Bank BCA",
      transaksiId: "TRX-001",
    },
    {
      total: 100000,
      status: "Lunas",
      name: "Pendaftaran",
      tempo: "20 januari 2025",
      tanggalBayar: "20 januari 2025",
      methodeBayar: "Bank BCA",
      transaksiId: "TRX-001",
    },
    {
      total: 100000,
      status: "Lunas",
      name: "Pendaftaran",
      tempo: "20 januari 2025",
      tanggalBayar: "20 januari 2025",
      methodeBayar: "Bank BCA",
      transaksiId: "TRX-001",
    },
  ];

  return (
    <div>
      <CenterLayout className="flex w-full flex-col  justify-start">
        <div className="w-full  h-32 border border-input rounded-md p-3 flex divide-x ">
          <div className="w-1/2 h-full p-3 flex flex-col justify-between">
            <span className="text-red-500 font-bold">Total Tunggakan</span>
            <span className="text-3xl font-bold">120</span>
          </div>
          <div className="w-1/2 h-full p-3 flex flex-col justify-between">
            <span className="text-blue-500 font-bold">Total Simpanan</span>
            <span className="text-3xl font-bold">120</span>
          </div>
          <div className="w-1/2 h-full p-3 flex flex-col justify-between">
            <span className="text-green-500 font-bold">Total Kolam</span>
            <span className="text-3xl font-bold">120</span>
          </div>
        </div>

        <div className="flex w-full my-5 justify-end gap-3 ">
          <Input
            type="search"
            className="max-w-xs"
            placeholder="Cari"
            icon="search"
          />
          <button className="btn btn-primary text-white">
            Tambah Budidaya
          </button>
        </div>
        <div className="w-full flex flex-col justify-start mb-5 space-y-3">
          <span className="font-bold">Daftar Tagihan</span>
          <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <CardFinance key={index} {...card} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start space-y-3">
          <span className="font-bold">Histori PEmbayaran</span>
          <div className="grid gap-5 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {cardsLunas.map((card, index) => (
              <CardFinance key={index} {...card} />
            ))}
          </div>
        </div>
      </CenterLayout>
    </div>
  );
}

export default FinancePage;
