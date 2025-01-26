import { Dashboard, Land, Planting, Pocket, Supplier } from "../../assets/icon";
import { listedAdmin } from "./listed";

export const sidebarListAdmin = [
  { label: "Dashboard", path: listedAdmin.dashboard, icon: Dashboard },
  { label: "Pendapatan", path: listedAdmin.adminPendapatan, icon: Land },
  { label: "Anggota", path: listedAdmin.adminAnggota, icon: Planting },
  { label: "Anggota Baru", path: listedAdmin.anggotaBaru, icon: Supplier },
  { label: "Lahan", path: listedAdmin.lahan, icon: Pocket },
  { label: "Lahan Baru", path: listedAdmin.lahanBaru, icon: Pocket },
  { label: "Budidaya", path: listedAdmin.budidaya, icon: Pocket },
  { label: "Simpanan", path: listedAdmin.simpanan, icon: Pocket },
  { label: "Tagihan", path: listedAdmin.tagihan, icon: Pocket },
  { label: "Admin", path: listedAdmin.finance, icon: Pocket },
];
