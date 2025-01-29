import { forwardRef, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Message } from "../form/error.field";
import { FieldError } from "react-hook-form";

type Wilayah = {
    id: string;
    name: string;
};

type SelectProps = {
    data: Array<Wilayah>;
    error?: string | FieldError;
    value?: string; // Gunakan `value` yang dikontrol
    className?: string;
    placeholder?: string;
    onChangeCallback?: (value: string) => void; 
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectLocation = forwardRef<HTMLSelectElement, SelectProps>(
  ({ data, value, placeholder, className, error, onChangeCallback, ...rest }, ref) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      if (onChangeCallback) {
        onChangeCallback(value); 
      }
      if (rest.onChange) {
        rest.onChange(event); 
      }
    };

    return (
      <div className="w-full">
        <select
          ref={ref}
          className={twMerge("select select-bordered w-full", className)}
          value={value} // Gunakan value yang dikontrol
          onChange={handleChange}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data?.map((item: Wilayah) => (
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
