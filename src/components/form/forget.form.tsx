import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { commonMessage } from "../../constant/form/validation.message";
import { listedUser } from "../../constant/routers/listed";
import { Forget } from "../../types/sign";
import Header from "../content/header.sign";
import { Message } from "./error.field";
import Input from "../ui/input";

function ForgetForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<Forget>({
    defaultValues: { email: "" },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(commonMessage.emailRequired)
          .email(commonMessage.emailInvalidFormat),
      })
    ),
  });

  const onSubmit: SubmitHandler<Forget> = (value) => {
    navigate(listedUser.sent, {
      state: {
        email: value.email,
        type: "reset_sent",
      },
    });
    reset();
  };

  useEffect(() => {
    setFocus("email");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title="Lupa Kata Sandi?"
        description={`Masukkan email Anda untuk menerima panduan 
          reset kata sandi.`}
      />
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" icon="email" placeholder="Email" {...register("email")} />
        <div className="flex justify-end">
          <Message
            isError={Boolean(errors.email)}
            message={errors.email?.message}
          />
        </div>
        <button className="font-medium tracking-wider w-full btn bg-primary hover:bg-primary hover:opacity-95 text-white mt-6">
          Kirim
        </button>
      </form>
    </>
  );
}

export default ForgetForm;
