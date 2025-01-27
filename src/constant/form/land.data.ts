export const landType = {
  shm: {
    id: "shm",
    label: "SHM",
    dark: "#04805A",
    light: "#E7EFEB",
  },
  girik: {
    id: "girik",
    label: "Girik",
    dark: "#D6A31F",
    light: "#FEF5E7",
  },
  sewa: {
    id: "sewa",
    label: "Kontrak / Sewa",
    dark: "#BC2020",
    light: "#F9E7E7",
  },
};

export const fakerLand = [
  { id: "shm", value: "124.32" },
  { id: "girik", value: "564.32" },
  { id: "sewa", value: "231.32" },
];

export const landFilter = [
  { value: "shm", label: "SHM" },
  { value: "girik", label: "Girik" },
  { value: "sewa", label: "Kontrak / Sewa" },
];

type OwnershipStatus = "shm" | "girik" | "sewa";

interface Property {
  id: string;
  landArea: number;
  ownershipStatus: OwnershipStatus;
  name: string;
  address: string;
  isBuilding: boolean;
}

function generateUniqueRandomData(): Property[] {
  const ownershipStatuses: OwnershipStatus[] = ["shm", "girik", "sewa"];
  const names = [
    "Budi",
    "Siti",
    "Agus",
    "Dewi",
    "Rina",
    "Joko",
    "Lina",
    "Yusuf",
    "Ayu",
    "Tono",
  ];
  const addresses = [
    "Jl. Merdeka No. 1",
    "Jl. Soekarno-Hatta No. 2",
    "Jl. Sudirman No. 3",
    "Jl. Thamrin No. 4",
    "Jl. Gatot Subroto No. 5",
    "Jl. Diponegoro No. 6",
    "Jl. Hasanuddin No. 7",
    "Jl. RA Kartini No. 8",
    "Jl. Palagan Tentara Pelajar No. 9",
    "Jl. Pahlawan No. 10",
  ];

  const properties: Set<string> = new Set();

  while (properties.size < 21) {
    const property: Property = {
      id: String(Math.floor(Math.random() * 10000) + 34),
      landArea: Math.floor(Math.random() * 1000) + 50,
      ownershipStatus:
        ownershipStatuses[Math.floor(Math.random() * ownershipStatuses.length)],
      name: names[Math.floor(Math.random() * names.length)],
      address: addresses[Math.floor(Math.random() * addresses.length)],
      isBuilding: Math.random() < 0.5,
    };

    const propertySignature = JSON.stringify(property);

    if (!properties.has(propertySignature)) {
      properties.add(propertySignature);
    }
  }

  return Array.from(properties).map((signature) => JSON.parse(signature));
}

export const listLand = generateUniqueRandomData();
