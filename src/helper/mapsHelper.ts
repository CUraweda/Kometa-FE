export const getLokasi = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lokasi = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(lokasi); // Kembalikan lokasi jika berhasil
        },
        (error) => {
          console.error("Error detecting location:", error);
          reject(error); // Kembalikan error jika gagal
        }
      );
    });
  };
  
  export const getNamaWilayah = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
  
      if (data && data.display_name) {
        return data.display_name; // Mengembalikan nama wilayah lengkap
      } else {
        return "Tidak ditemukan"; // Jika data kosong
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error mendapatkan nama wilayah";
    }
  };