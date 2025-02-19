import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "../form/error.field";
import { RiSearchLine } from "react-icons/ri";
import { Email } from "../../assets/icon";

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
  uom?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      className,
      placeholder,
      type,
      icon,
      direction = "left",
      uom,
      ...rest
    },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const selectedIcon = {
      search: <RiSearchLine />,
      email: <Email />,
    };

    return (
      <div className="w-full relative">
        <label
          className={twMerge(
            "border border-gray-300 h-[48px] rounded-lg px-3 flex items-center gap-2 focus-within:border-primary",
            icon ? "pr-10" : "",
            uom ? "pr-14" : "",
            className
          )}
        >
          {icon && direction === "left"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
          <input
            type={type}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (type == "tel") {
                const allowedKeys = /[0-9]/;
                const specialKeys = [
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                ];

                if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }
            }}
            className={twMerge(
              `grow outline-none bg-transparent w-full ${
                error ? "border-red-600" : ""
              }`,
              className
            )}
            {...rest}
            ref={ref}
          />
          {uom && (
            <span className="absolute right-4 text-black text-sm">{uom}</span>
          )}
          {icon && direction === "right"
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
