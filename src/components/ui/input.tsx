import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "../form/error.field";
import { RiSearchLine } from "react-icons/ri";

type InputProps = {
  error?: string | FieldError;
  type:
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "text"
    | "time";
  placeholder?: string;
  className?: string;
  icon?: string;
  direction?: "left" | "right";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error, className, placeholder, type, icon, direction = "left", ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const selectedIcon = {
      search: <RiSearchLine />,
    };

    return (
      <div className="w-full">
        <label
          className={twMerge(
            icon
              ? "input input-bordered flex items-center gap-2"
              : "form-control w-full",
            className
          )}
        >
          {icon && direction == "left"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
          <input
            type={type}
            placeholder={placeholder}
            className={twMerge(
              `${icon ? "grow" : "input input-bordered"} w-full ${
                error ? "border-red-600" : ""
              }`,
              className
            )}
            {...rest}
            ref={ref}
          />
          {icon && direction == "right"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
        </label>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
