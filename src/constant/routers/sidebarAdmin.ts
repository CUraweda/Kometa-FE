import { Dashboard, Land, Planting, Pocket, Supplier } from "../../assets/icon";
import { listed } from "./listed";

export const sidebarListAdmin = [
  { label: "Dashboard", path: listed.dashboard, icon: Dashboard },
  { label: "Pendapatan", path: listed.adminPendapatan, icon: Land },
  { label: "Anggota", path: listed.adminAnggota, icon: Planting },
  { label: "Anggota Baru", path: listed.anggotaBaru, icon: Supplier },
  { label: "Lahan", path: listed.finance, icon: Pocket },
  { label: "Lahan Baru", path: listed.finance, icon: Pocket },
  { label: "Budidaya", path: listed.finance, icon: Pocket },
  { label: "Simpanan", path: listed.finance, icon: Pocket },
  { label: "Admin", path: listed.finance, icon: Pocket },
];
