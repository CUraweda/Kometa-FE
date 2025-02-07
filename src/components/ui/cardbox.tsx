import { useEffect, useState } from "react";
import { Payment } from "../../types/common";
import { convertToRupiah } from "../../utils/rupiah";
import { twMerge } from "tailwind-merge";

type Props = {
  data: Array<Payment>;
  onChange: (item: Payment) => void;
  selected: string;
};

function CardBox({ data, onChange, selected }: Props) {
  const [currentSelected, setCurrentSelected] = useState("");

  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

  return data?.map((item) => {
    const { id, value, img, label, price, active } = item;
    const isActive = value === currentSelected;
    const handleSlected = () => {
      onChange(item);
      setCurrentSelected(item.value);
    };

    return (
      <label
        key={value}
        htmlFor={value}
        onClick={active ? handleSlected : (e) => e.preventDefault()}
        className={twMerge(
          "border rounded-lg p-4 flex flex-1 justify-between cursor-pointer bg-transparent z-[999]",
          isActive ? "border-primary" : "",
          !active && "cursor-not-allowed opacity-50 bg-gray-200 border-gray-400 text-gray-600" // Menambahkan warna abu-abu ketika value bukan QRIS
        )}
        
      >
        <label onClick={active ? handleSlected : (e) => e.preventDefault()} className="flex gap-4">
          <input
            id={value}
            name={id}
            type="radio"
            className="radio radio-xs checked:bg-primary"
            onClick={active ? handleSlected : (e) => e.preventDefault()}
            value={currentSelected}
            defaultChecked={isActive}
            
          />
          <label className="flex flex-col -m-1 cursor-pointer">
            <label
              htmlFor={value}
              className="font-medium tracking-wide text-sm cursor-pointer"
            >
              {label}
            </label>
            <label
              htmlFor={value}
              className="text-sm font-medium text-gray-500 cursor-pointer"
            >
              {convertToRupiah(price)}
            </label>
            {
              !active && 
              <>
            <label
              htmlFor={value}
              className="text-sm font-medium text-red-500 cursor-pointer"
            >
              under maintenance
            </label>
              </>
            }
          </label>
        </label>
        <label htmlFor={value}>
          <img
            className="rounded overflow-hidden w-14"
            src={img}
            alt={`bank-${value}`}
          />
        </label>
      </label>
    );
  });
}

export default CardBox;