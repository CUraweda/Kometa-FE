import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { commonMessage } from "../../constant/form/validation.message";
import { listed } from "../../constant/routers/listed";
import { SignUp } from "../../types/sign";
import Header from "../content/header.sign";
import Input from "../ui/input";
import Password from "../ui/password";

function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<SignUp>({
    defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        phoneNumber: yup
          .string()
          .required(commonMessage.phoneRequired)
          .min(10, commonMessage.phoneMaxDigit),
        email: yup
          .string()
          .required(commonMessage.emailRequired)
          .email(commonMessage.emailInvalidFormat),
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

  const onSubmit: SubmitHandler<SignUp> = (value) => {
    navigate(listed.verify, {
      state: {
        phoneNumber: value.phoneNumber,
      },
    });
    reset();
  };

  useEffect(() => {
    setFocus("phoneNumber");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={errors ? "py-20" : ""}>
      <Header
        title="Gabung Bersama Kometa"
        description="Daftar sekarang untuk akses layanan koperasi modern yang praktis, cepat, dan dirancang untuk memenuhi kebutuhan Anda."
      />
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Nomor Whatsapp"
            error={errors?.phoneNumber}
            {...register("phoneNumber")}
          />

          <Input
            type="text"
            placeholder="Email"
            error={errors?.email}
            {...register("email")}
          />

          <Password
            placeholder="Kata Sandi"
            error={errors?.password}
            {...register("password")}
          />

          <Password
            placeholder="Ulangi Kata Sandi"
            error={errors?.repeatPassword}
            {...register("repeatPassword")}
          />
        </div>
        <button className="font-medium tracking-wider w-full btn bg-emeraldGreen hover:bg-emeraldGreen hover:opacity-95 text-white mt-6">
          Daftar
        </button>
        <button className="text-sm mt-6">
          Sudah punya akun?
          <Link
            className="ml-1 text-emeraldGreen font-medium"
            to={listed.signin}
          >
            Masuk
          </Link>
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
