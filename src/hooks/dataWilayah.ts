import { useState, useCallback } from "react";
import { datawilayah } from "@/middleware/index";

type Wilayah = {
  id: string;
  name: string;
};

export const useWilayah = (scope: string) => {
  const [provinsi, setProvinsi] = useState<Wilayah[]>([]);
  const [kabupaten, setKabupaten] = useState<Record<string, Wilayah[]>>({});
  const [kecamatan, setKecamatan] = useState<Record<string, Wilayah[]>>({});
  const [kelurahan, setKelurahan] = useState<Record<string, Wilayah[]>>({});

  const fetchProvinsi = useCallback(async () => {
    try {
      const response = await datawilayah.dataProvinsi();
      const data = response?.data;

      if (Array.isArray(data)) {
        setProvinsi(data as Wilayah[]);
      } else {
        console.error("Data provinsi bukan array");
      }
    } catch (error) {
      console.error("Error fetching provinsi:", error);
    }
  }, []);

  const fetchKabupaten = useCallback(
    async (id: string) => {
      if (!id) return;
      try {
        const response = await datawilayah.dataKabupaten(id);
        const data = response?.data;
        if (Array.isArray(data)) {
          setKabupaten((prev) => ({
            ...prev,
            [scope]: data, // Simpan kabupaten berdasarkan scope
          }));
        } else {
          console.error("Data kabupaten bukan array");
        }
      } catch (error) {
        console.error("Error fetching kabupaten:", error);
      }
    },
    [scope]
  );

  const fetchKecamatan = useCallback(
    async (id: string) => {
      if (!id) return;
      try {
        const response = await datawilayah.dataKecamatan(id);
        const data = response?.data;
        if (Array.isArray(data)) {
          setKecamatan((prev) => ({
            ...prev,
            [scope]: data, // Simpan kecamatan berdasarkan scope
          }));
        } else {
          console.error("Data kecamatan bukan array");
        }
      } catch (error) {
        console.error("Error fetching kecamatan:", error);
      }
    },
    [scope]
  );

  const fetchKelurahan = useCallback(
    async (id: string) => {
      if (!id) return;
      try {
        const response = await datawilayah.dataKelurahan(id);
        const data = response?.data;
        if (Array.isArray(data)) {
          setKelurahan((prev) => ({
            ...prev,
            [scope]: data, // Simpan kelurahan berdasarkan scope
          }));
        } else {
          console.error("Data kelurahan bukan array");
        }
      } catch (error) {
        console.error("Error fetching kelurahan:", error);
      }
    },
    [scope]
  );

  return {
    provinsi,
    kabupaten: kabupaten[scope] || [],
    kecamatan: kecamatan[scope] || [],
    kelurahan: kelurahan[scope] || [],
    fetchProvinsi,
    fetchKabupaten,
    fetchKecamatan,
    fetchKelurahan,
  };
};
