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
  