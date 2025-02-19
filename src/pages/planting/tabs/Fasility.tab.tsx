function FasilityTab() {
  return (
    <div className="w-full">
      <h3 className="mt-8 mb-2 font-semibold">Fasilitas Infrastruktur</h3>
      <div className="w-full flex gap-8 flex-wrap">
        {[
          [
            { label: "Ipal", value: "Ya" },
            { label: "Kualitas Provider Internet", value: "4G" },
          ],
          [
            { label: "Sumber Air", value: "Air Laut" },
            { label: "Nama Provider Internet", value: "Telkomsel" },
          ],
          [{ label: "Sumber Listrik", value: "PLN" }],
        ].map((column, index) => {
          return (
            <div
              className="flex-1 flex flex-col gap-2 text-sm"
              key={`column-${index}`}
            >
              {column.map((row, index) => {
                return (
                  <div
                    className="flex items-center gap-1 mb-1"
                    key={`row-${index}`}
                  >
                    <label className="min-w-[160px] flex flex-wrap text-gray-500">
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
}

export default FasilityTab;
