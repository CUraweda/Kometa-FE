import { Dashboard, Land, Planting, Pocket, Supplier } from "../../assets/icon";
import { listed } from "./listed";

export const sidebarList = [
  { label: "Dashboard", path: listed.dashboard, icon: Dashboard },
  { label: "Lahan", path: listed.land, icon: Land },
  { label: "Budidaya", path: listed.planting, icon: Planting },
  { label: "Pemasok", path: listed.supplier, icon: Supplier },
  { label: "Pembiayaan", path: listed.finance, icon: Pocket },
];
