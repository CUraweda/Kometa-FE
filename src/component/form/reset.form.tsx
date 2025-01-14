import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { commonMessage } from "../../constant/form/validation.message";
import { listed } from "../../constant/routers/listed";
import { Reset } from "../../types/sign";
import Header from "../content/header.sign";
import { Message } from "./error.field";

function ResetForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState({
    password: false,
    repeatPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<Reset>({
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .required(commonMessage.passwordRequired)
          .min(8, commonMessage.passwordMinDigit),
        repeatPassword: yup
          .string()
          .required(commonMessage.repeatPasswordRequired)
          .oneOf([yup.ref("password")], commonMessage.unmatchPassword),
      })
    ),
  });

  const handleShow = (inputType: "password" | "repeatPassword") => {
    if (inputType == "password") {
      setShow((prev) => ({ ...prev, password: !prev.password }));
    } else {
      setShow((prev) => ({ ...prev, repeatPassword: !prev.repeatPassword }));
    }
  };

  const onSubmit: SubmitHandler<Reset> = () => {
    navigate(listed.sent, {
      state: {
        type: "password_changed",
      },
    });
    reset();
  };

  useEffect(() => {
    setFocus("password");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={errors ? "py-20" : ""}>
      <Header
        title="Reset Kata Sandi"
        description="Masukkan kata sandi baru Anda dan konfirmasi dengan memasukkan kata sandi yang sama."
      />
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full mt-4 relative">
          <input
            type={show.password ? "text" : "password"}
            placeholder="Kata Sandi"
            className={`input input-bordered flex items-center relative ${
              errors.password ? "border-red-600" : ""
            }`}
            {...register("password")}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
            {show.password ? (
              <RiEyeLine
                size={20}
                className="text-slate-500"
                onClick={() => handleShow("password")}
              />
            ) : (
              <RiEyeOffLine
                size={20}
                className="text-slate-500"
                onClick={() => handleShow("password")}
              />
            )}
          </div>
        </label>
        <Message
          isError={Boolean(errors?.password)}
          message={errors.password?.message}
        />

        <label className="form-control w-full mt-4 relative">
          <input
            type={show.repeatPassword ? "text" : "password"}
            placeholder="Ulangi Kata Sandi"
            className={`input input-bordered flex items-center relative ${
              errors.repeatPassword ? "border-red-600" : ""
            }`}
            {...register("repeatPassword")}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
            {show.repeatPassword ? (
              <RiEyeLine
                size={20}
                className="text-slate-500"
                onClick={() => handleShow("repeatPassword")}
              />
            ) : (
              <RiEyeOffLine
                size={20}
                className="text-slate-500"
                onClick={() => handleShow("repeatPassword")}
              />
            )}
          </div>
        </label>
        <Message
          isError={Boolean(errors.repeatPassword)}
          message={errors.repeatPassword?.message}
        />

        <button className="font-medium tracking-wider w-full btn bg-emeraldGreen hover:bg-emeraldGreen hover:opacity-95 text-white mt-6">
          Perbaharui Kata Sandi
        </button>
      </form>
    </div>
  );
}

export default ResetForm;
