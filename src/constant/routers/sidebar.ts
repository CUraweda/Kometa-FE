import { Dashboard, Land, Planting, Pocket} from "../../assets/icon";
import { listedUser } from "./listed";

export const sidebarList = [
  { label: "Dashboard", path: listedUser.dashboard, icon: Dashboard },
  { label: "Lahan", path: listedUser.land, icon: Land },
  { label: "Budidaya", path: listedUser.planting, icon: Planting },
  { label: "Simpanan", path: listedUser.finance, icon: Pocket },
];

export const sidebarListUnverif = [
  { label: "Dashboard", path: listedUser.dahsboardVerfi, icon: Dashboard },
 
];
