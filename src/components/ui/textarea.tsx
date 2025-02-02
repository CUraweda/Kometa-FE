import { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "../form/error.field";

type TextAreaProps = {
  error?: string | FieldError;
  rows?: number;
  placeholder?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ rows = 2, className = "", placeholder, error, ...rest }, ref) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <>
      <div>

        <textarea
          ref={ref}
          rows={rows}
          className={twMerge(
            "textarea textarea-bordered w-full",
            className
          )}
          placeholder={placeholder}
          {...rest}
        ></textarea>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
      </>
    );
  }
);

export default TextArea;
