import { Option } from "@/types/common";
import { forwardRef, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Message } from "../form/error.field";
import { FieldError } from "react-hook-form";

type wilayah = {
    id: string,
    name: string
}
type SelectProps = {
  data: Array<wilayah>;
  error?: string | FieldError;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  onChangeCallback?: (value: string) => void; // Tambahkan prop untuk callback
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectLocation = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { data, defaultValue, placeholder, className, error, onChangeCallback, ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      if (onChangeCallback) {
        onChangeCallback(value); // Panggil callback saat ada perubahan
      }
      if (rest.onChange) {
        rest.onChange(event); // Panggil onChange bawaan jika ada
      }
    };

    return (
      <div className="w-full">
        <select
          ref={ref}
          className={twMerge("select select-bordered w-full", className)}
          defaultValue={defaultValue ?? ""}
          onChange={handleChange}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data?.map((item: wilayah) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

SelectLocation.displayName = "SelectLocation";

export default SelectLocation;
