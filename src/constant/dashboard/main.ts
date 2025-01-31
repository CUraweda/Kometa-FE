import { convertToRupiah } from "@/utils/rupiah";

export const accumulationData = [
  { name: "Senin", simpanan: 40, lahan: 24, kolam: 15 },
  { name: "Selasa", simpanan: 30, lahan: 13, kolam: 20 },
  { name: "Rabu", simpanan: 20, lahan: 98, kolam: 27 },
  { name: "Kamis", simpanan: 27, lahan: 39, kolam: 40 },
  { name: "Jumat", simpanan: 18, lahan: 48, kolam: 23 },
  { name: "Sabtu", simpanan: 23, lahan: 38, kolam: 34 },
  { name: "Minggu", simpanan: 34, lahan: 43, kolam: 45 },
];

export const statistics = [
  {
    title: "Total Simpanan",
    value: convertToRupiah(12_000_000),
    color: "#0E8388",
  },
  { title: "Total Lahan", value: 30, color: "#305986" },
  { title: "Total Kolam", value: 300, color: "#FDB034" },
];

export const dataPengajuan = [
  {
    id: 1,
    luas: 8,
    nama: "Kusmaryo Aji",
    nama_pt: "Mutiara Berkah Tani",
    kepemilikan: "sewa",
    isBuilding: true,
    isApproved: false,
  },
  {
    id: 1,
    luas: 5,
    nama: "Fernandes",
    nama_pt: "Sejahtera Tani",
    kepemilikan: "shm",
    isBuilding: true,
    isApproved: true,
  },
];

export const tagihanSimpanan = [
  {
    id: 11,
    total: 1_000_000,
    title: "Simpanan Bulan Januari",
    jatuh_tempo: "2/1/2025",
    isPaid: false,
  },
  {
    id: 22,
    total: 12_000_000,
    title: "Simpanan Bulan Juni",
    jatuh_tempo: "6/6/2025",
    isPaid: false,
  },
];
