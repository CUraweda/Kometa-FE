import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValue, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Eye, EyeOff } from "../../assets/icon";
import { SignUp } from "../../types/sign";
import Header from "../content/header.sign";
import { Message } from "./error.field";

function SignUpForm() {
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
          .required("Nomor telepon harus diisi")
          .min(10, "Nomor telepon minimal 10 digit"),
        email: yup
          .string()
          .required("Email harus diisi")
          .email("Email harus diisi"),
        password: yup.string().required("Kata sandi harus diisi"),
        repeatPassword: yup
          .string()
          .required("Ulangi kata sandi harus diisi")
          .oneOf([yup.ref("password")], "Kata sandi tidak cocok"),
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

  const onSubmit = (value: FieldValue<SignUp>) => {
    window.alert(JSON.stringify(value));
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
        <label className="form-control w-full">
          <input
            type="text"
            placeholder="Nomor Whatsapp"
            className={`input input-bordered ${
              errors.email ? "border-red-600" : ""
            }`}
            {...register("phoneNumber")}
          />
        </label>
        <Message
          isError={Boolean(errors.phoneNumber)}
          message={errors.phoneNumber?.message}
        />

        <label className="form-control mt-4 w-full">
          <input
            type="text"
            placeholder="Email"
            className={`input input-bordered ${
              errors.email ? "border-red-600" : ""
            }`}
            {...register("email")}
          />
        </label>
        <Message
          isError={Boolean(errors.email)}
          message={errors.email?.message}
        />

        <label className="form-control w-full mt-4 relative">
          <input
            type={show.password ? "text" : "password"}
            placeholder="Kata Sandi"
            className={`input input-bordered flex items-center relative ${
              errors.password ? "border-red-600" : ""
            }`}
            {...register("password")}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {show.password ? (
              <span onClick={() => handleShow("password")}>
                <Eye />
              </span>
            ) : (
              <span onClick={() => handleShow("password")}>
                <EyeOff />
              </span>
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
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {show.repeatPassword ? (
              <span onClick={() => handleShow("repeatPassword")}>
                <Eye />
              </span>
            ) : (
              <span onClick={() => handleShow("repeatPassword")}>
                <EyeOff />
              </span>
            )}
          </div>
        </label>
        <Message
          isError={Boolean(errors.repeatPassword)}
          message={errors.repeatPassword?.message}
        />

        <button className="font-medium tracking-wider w-full btn bg-emeraldGreen hover:bg-emeraldGreen hover:opacity-95 text-white mt-6">
          Daftar
        </button>
        <button className="text-sm mt-6">
          Sudah punya akun?
          <Link className="ml-1 text-blue-700" to="/signin">
            Masuk
          </Link>
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
