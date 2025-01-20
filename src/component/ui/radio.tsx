import { twMerge } from "tailwind-merge";
import { Option } from "../../types/common";
import { useState } from "react";
import { Message } from "../form/error.field";
import { FieldError } from "react-hook-form";

type Props = {
  id: string;
  data: Array<Option>;
  onChange: (item: Option) => void;
  selected: string;
  className?: string;
  error?: string | FieldError;
};

function Radio({ id, data, error, onChange, selected, className }: Props) {
  const [currentSelected, setCurrentSelected] = useState(selected);
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="w-full">
      <div className={twMerge("flex gap-3 h-full", className)}>
        {data.map((item) => {
          const { value, label } = item;
          const isSelected = currentSelected == value;
          return (
            <label
              key={value}
              htmlFor={value}
              className={twMerge(
                "border input-bordered rounded-lg p-2 px-3 text-gray-500 flex flex-1 items-center justify-between cursor-pointer",
                isSelected ? "border-emeraldGreen" : ""
              )}
            >
              <label htmlFor={value} className="cursor-pointer">
                {label}
              </label>
              <input
                id={value}
                type="radio"
                name={id}
                className="radio radio-xs checked:bg-emeraldGreen"
                onClick={() => {
                  onChange(item);
                  setCurrentSelected(value);
                }}
                value={currentSelected}
                defaultChecked={isSelected}
              />
            </label>
          );
        })}
      </div>
      <Message isError={Boolean(errorMessage)} message={errorMessage} />
    </div>
  );
}

export default Radio;
