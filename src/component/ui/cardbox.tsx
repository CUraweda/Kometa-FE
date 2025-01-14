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
    const { id, value, img, label, price } = item;
    const isActive = value === currentSelected;
    const handleSlected = () => {
      onChange(item);
      setCurrentSelected(item.value);
    };

    return (
      <label
        key={value}
        htmlFor={value}
        onClick={handleSlected}
        className={twMerge(
          "border hover:border-emeraldGreen rounded-lg p-4 flex flex-1 justify-between cursor-pointer bg-transparent z-[999]",
          isActive ? "border-emeraldGreen" : ""
        )}
      >
        <label onClick={handleSlected} className="flex gap-4">
          <input
            id={value}
            name={id}
            type="radio"
            className="radio radio-xs checked:bg-emeraldGreen"
            onClick={handleSlected}
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
          </label>
        </label>
        <label htmlFor={value}>
          <img
            className="rounded overflow-hidden h-14"
            src={img}
            alt={`bank-${value}`}
          />
        </label>
      </label>
    );
  });
}

export default CardBox;
