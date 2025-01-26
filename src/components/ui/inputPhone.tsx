// import React, { forwardRef, useRef, useImperativeHandle } from "react";
// import { FieldError } from "react-hook-form";
// import { twMerge } from "tailwind-merge";
// import { Message } from "../form/error.field";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// type InputProps = {
//   error?: string | FieldError;
//   placeholder?: string;
//   className?: string;
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

// const TelInput = forwardRef<HTMLInputElement, InputProps>(
//   ({ error, className, placeholder, ...rest }, ref) => {
//     const errorMessage = typeof error === "string" ? error : error?.message;

//     const phoneInputRef = useRef<HTMLInputElement>(null);
//     useImperativeHandle(ref, () => phoneInputRef.current as HTMLInputElement);

//     return (
//       <div className="w-full">
//         <label className={twMerge("form-control w-full", className)}>
//           <PhoneInput
//             country={'us'}
//             placeholder={placeholder}
//             inputClass={twMerge(`w-full ${error ? "border-red-600" : ""}`, className)}
//             {...rest}
//             inputRef={phoneInputRef}
//           />
//         </label>
//         <Message isError={Boolean(errorMessage)} message={errorMessage} />
//       </div>
//     );
//   }
// );

// TelInput.displayName = "TelInput";

// export default TelInput;
