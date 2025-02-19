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
} & React.InputHTMLAttributes<HTMLInputElement>;

const FloatingInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { error, className, placeholder, type, icon, direction = "left", ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const selectedIcon = {
      search: (
        <RiSearchLine className="text-gray-500 peer-placeholder-shown:text-gray-400" />
      ),
      email: (
        <Email className="text-gray-500 peer-placeholder-shown:text-gray-400" />
      ),
    };

    return (
      <div className="relative w-full">
        <label
          className={twMerge(
            "peer border border-gray-300 dark:border-gray-600 rounded-lg flex items-center px-3 py-2 relative bg-transparent focus-within:border-blue-600",
            className
          )}
        >
          {icon && direction === "left" ? (
            <span className="mr-2">
              {selectedIcon[icon as keyof typeof selectedIcon]}
            </span>
          ) : null}
          <input
            type={type}
            placeholder=" "
            onKeyDown={(e) => {
              if (type === "tel") {
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
              "peer block w-full text-sm bg-transparent focus:outline-none focus:ring-0 border-0 px-2.5 pt-4 pb-2.5",
              error ? "border-red-600" : ""
            )}
            ref={ref}
            {...rest}
          />
          {icon && direction === "right" ? (
            <span className="ml-2">
              {selectedIcon[icon as keyof typeof selectedIcon]}
            </span>
          ) : null}
          <label
            className="absolute top-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-2 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 
            peer-focus:top-2 peer-focus:scale-75 peer-focus:text-blue-600 transition-all"
          >
            {placeholder}
          </label>
        </label>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
