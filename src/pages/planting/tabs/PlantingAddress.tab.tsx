const PlantingAddressTab = () => {
  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">Alamat Budidaya</h3>
      <div className="mb-6">
        <div className="flex md:w-2/3">
          {/* {polygonCoordinates && (
            <MapView polygonCoordinates={polygonCoordinates} />
          )} */}
        </div>
      </div>

      <div className="w-full flex gap-8 flex-wrap">
        {[
          [
            { label: "Provinsi", value: "DKI Jakarta" },
            { label: "Desa / Kelurahan", value: "Kelurahan Gambir" },
          ],
          [
            { label: "Kota / Kabupaten", value: "Jakarta Pusat" },
            { label: "Kode POS", value: "10110" },
          ],
          [
            { label: "Kecamatan", value: "Gambir" },
            { label: "Detail Alamat", value: "Jl. Merdeka No. 1, Jakarta" },
          ],
        ].map((column, index) => {
          return (
            <div
              className="flex-1 flex flex-col gap-2 text-sm"
              key={`column-${index}`}
            >
              {column.map((row, index) => {
                return (
                  <div className="flex items-center gap-1" key={`row-${index}`}>
                    <label className="min-w-[150px] text-gray-500">
                      {row.label}
                    </label>
                    <span>: {row.value || "-"}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlantingAddressTab;
