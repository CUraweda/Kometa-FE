import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { commonMessage } from "../../constant/form/validation.message";
import { listedUser } from "../../constant/routers/listed";
import { SignUp } from "../../types/sign";
import Header from "../content/header.sign";
import Input from "../ui/input";
import Password from "../ui/password";
import { authentication } from "@/middleware";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      phoneWA: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        phoneWA: yup
          .string()
          .required(commonMessage.phoneRequired)
          .min(10, commonMessage.phoneMaxDigit),
        name: yup
          .string()
          .required(),
        email: yup
          .string()
          .required(commonMessage.emailRequired)
          .email(commonMessage.emailInvalidFormat),
        password: yup
          .string()
          .required(commonMessage.passwordRequired)
          .min(8, commonMessage.passwordMinDigit),
        confirm_password: yup
          .string()
          .required(commonMessage.repeatPasswordRequired)
          .oneOf([yup.ref("password")], commonMessage.unmatchPassword),
      })
    ),
  });

  const onSubmit = async (formData: SignUp) => {

    const data = {
      ...formData,
      roleId: "USER",
    };

    try {
      const rest = await authentication.register(data)
      rest == 200 ? navigate('/signin') : ''
    } catch (error) {
      console.log(error);
    }
    reset();

  };

  useEffect(() => {
    setFocus("phoneWA");
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
            placeholder="Name"
            error={errors?.name}
            {...register("name")}
          />
          {/* <PhoneInput
            country={'us'}
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
            {...register("phoneWA")}
          /> */}
          <Input
            type="text"
            placeholder="Nomor Whatsapp"
            error={errors?.phoneWA}
            {...register("phoneWA")}
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
            error={errors?.confirm_password}
            {...register("confirm_password")}
          />
        </div>
        <button className="font-medium tracking-wider w-full btn bg-emeraldGreen hover:bg-emeraldGreen hover:opacity-95 text-white mt-6">
          Daftar
        </button>
        <button className="text-sm mt-6">
          Sudah punya akun?
          <Link
            className="ml-1 text-emeraldGreen font-medium"
            to={listedUser.signin}
          >
            Masuk
          </Link>
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
