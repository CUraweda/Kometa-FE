import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Area } from "../assets/icon";
import { Message } from "../components/form/error.field";
import { commonMessage } from "../constant/form/validation.message";
import { Profile } from "../types/user";
import CenterLayout from "@/layout/center.layout";

function ProfilePage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(commonMessage.nameRequired),
        phoneNumber: yup
          .string()
          .required(commonMessage.phoneRequired)
          .min(10, commonMessage.phoneMaxDigit),
        email: yup
          .string()
          .required(commonMessage.nameRequired)
          .email(commonMessage.emailInvalidFormat),
      })
    ),
    defaultValues: {
      name: "Admin",
      phoneNumber: "6289777888999",
      email: "example@mail.com",
    },
  });

  const onSubmit: SubmitHandler<Profile> = (value) => {
    window.alert(JSON.stringify(value));
    reset();
  };

  return (
    <CenterLayout>
      <div className="space-y-8">
        <h3 className="font-medium">Edit Profile</h3>

        {/* Avatar */}
        <div className="flex gap-5 items-center">
          <div className="avatar">
            <div className="w-24 rounded-xl">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Area className="h-16" />
            <p className="text-sm">Anggota Pemilik Aset/Lahan</p>
          </div>
        </div>

        {/* Profile Form */}
        <form
          className="flex flex-col max-w-xs space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Nama"
              className={`input input-bordered ${
                errors.name ? "border-red-600" : ""
              }`}
              {...register("name")}
            />
          </label>
          <Message
            isError={Boolean(errors.name)}
            message={errors.name?.message}
          />

          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Nomor Telepon"
              className={`input input-bordered ${
                errors.phoneNumber ? "border-red-600" : ""
              }`}
              {...register("phoneNumber")}
            />
          </label>
          <Message
            isError={Boolean(errors.phoneNumber)}
            message={errors.phoneNumber?.message}
          />

          <label className="form-control w-full">
            <input
              type="text"
              placeholder="example@mail.com"
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
          <button className="btn btn-primary text-white ml-auto font-normal tracking-wide">
            Perbaharui
          </button>
        </form>
      </div>
    </CenterLayout>
  );
}

export default ProfilePage;
