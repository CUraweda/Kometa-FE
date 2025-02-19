import { listedAdmin } from './listed';

export const sidebarListAdmin = [
  {
    label: 'Dashboard',
    path: listedAdmin.dashboard,
    icon: 'RiHome5Line',
    subMenu: false,
    subLabel: [],
  },
  {
    label: 'Anggota',
    path: '',
    icon: 'GoPeople',
    subMenu: true,
    subLabel: [
      {
        label: "Daftar Anggota",
        path: listedAdmin.adminAnggota
      },
      {
        label: "Pengajuan Anggota",
        path: listedAdmin.anggotaBaru
      }
    ],
  },
  {
    label: 'Lahan',
    path: '',
    icon: 'FiMapPin',
    subMenu: true,
    subLabel: [
      {
        label: "Daftar Lahan",
        path: listedAdmin.lahan
      },
      {
        label: "Pengajuan Lahan",
        path: listedAdmin.lahanBaru
      }
    ],
  },
  {
    label: 'Biaya',
    path: '',
    icon: 'BsCashStack',
    subMenu: true,
    subLabel: [
      {
        label: "Tagihan",
        path: listedAdmin.tagihan
      },
      {
        label: "Histori Pembayaran",
        path: listedAdmin.historyPayment
      },
    ],
  },
  
  {
    label: 'Budidaya',
    path: listedAdmin.budidaya,
    icon: 'PiPlantThin',
    subMenu: false,
    subLabel: [],
  },
  
 
];

// export const sidebarListAdmin = [
//   { label: "Dashboard", path: listedAdmin.dashboard, icon: Dashboard },
//   { label: "Pendapatan", path: listedAdmin.adminPendapatan, icon: Land },
//   { label: "Anggota", path: listedAdmin.adminAnggota, icon: Planting },
//   { label: "Anggota Baru", path: listedAdmin.anggotaBaru, icon: Supplier },
//   { label: "Lahan", path: listedAdmin.lahan, icon: Pocket },
//   { label: "Lahan Baru", path: listedAdmin.lahanBaru, icon: Pocket },
//   { label: "Budidaya", path: listedAdmin.budidaya, icon: Pocket },
//   { label: "Simpanan", path: listedAdmin.simpanan, icon: Pocket },
//   { label: "Tagihan", path: listedAdmin.tagihan, icon: Pocket },
//   { label: "Admin", path: listedAdmin.finance, icon: Pocket },
// ];
