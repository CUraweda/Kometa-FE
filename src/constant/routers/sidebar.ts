
import { listedUser } from "./listed";

export const sidebarList = [
  { label: "Dashboard", path: listedUser.dashboard, icon: 'RiHome5Line' },
  { label: "Lahan", path: listedUser.land, icon: 'FiMapPin' },
  { label: "Budidaya", path: listedUser.planting, icon: 'PiPlantThin' },
  { label: "Biaya", path: listedUser.finance, icon: 'BsCashStack' },
];

export const sidebarListUnverif = [
  { label: "Dashboard", path: listedUser.dahsboardVerfi, icon: 'RiHome5Line' },
 
];
