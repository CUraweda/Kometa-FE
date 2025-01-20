import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { commonMessage } from "../../constant/form/validation.message";
import { listed } from "../../constant/routers/listed";
import { SignIn } from "../../types/sign";
import Header from "../content/header.sign";
import Input from "../ui/input";
import Password from "../ui/password";

const MOCK = {
  email: "admin@mail.com",
  password: "12345678",
};

function SignInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<SignIn>({
    defaultValues: { email: MOCK.email, password: MOCK.password },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(commonMessage.emailRequired)
          .email(commonMessage.emailInvalidFormat),
        password: yup.string().required(commonMessage.passwordRequired),
      })
    ),
  });

  const onSubmit: SubmitHandler<SignIn> = (value) => {
    if (value.email == MOCK.email && value.password == MOCK.password) {
      reset();
      navigate(listed.dashboard, { replace: true });
    }
  };

  useEffect(() => {
    setFocus("email");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title="Selamat Datang di Kometa"
        description="Masuk sekarang untuk menikmati layanan terbaik dari koperasi kami. Akses
        mudah, cepat, dan mendukung kebutuhan Anda."
      />
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Email"
          error={errors?.email}
          {...register("email")}
        />

        <Password
          className="mt-4"
          placeholder="Kata Sandi"
          error={errors?.password}
          {...register("password")}
        />

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => navigate(listed.forget)}
            className="text-sm justify-self-end text-blue-700"
          >
            Lupa kata sandi?
          </button>
        </div>
        <button className="font-medium tracking-wider w-full btn bg-emeraldGreen hover:bg-emeraldGreen hover:opacity-95 text-white mt-6">
          Masuk
        </button>
        <button className="text-sm mt-6">
          Belum punya akun?
          <Link
            className="ml-1 text-emeraldGreen font-medium"
            to={listed.signup}
          >
            Daftar
          </Link>
        </button>
      </form>
    </>
  );
}

export default SignInForm;
