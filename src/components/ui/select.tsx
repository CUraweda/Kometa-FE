import { Option } from "@/types/common";
import { forwardRef, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Message } from "../form/error.field";
import { FieldError } from "react-hook-form";

type SelectProps = {
  data: Array<Option>;
  error?: string | FieldError;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  uom?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { data, defaultValue, placeholder, className, error, uom, ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="w-full relative">
        <select
          ref={ref}
          className={twMerge("select select-bordered w-full pr-14", className)}
          defaultValue={defaultValue ?? ""}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data?.map((item: Option) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {uom && (
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {uom}
          </span>
        )}
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
