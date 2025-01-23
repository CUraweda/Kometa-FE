import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../components/shared/payment.component";
import Radio from "../components/ui/radio";
import Upload from "../components/ui/upload";
import {
  InstructionKey,
  instructions,
  instuctionId,
} from "../constant/content/instruction";
import { dummy, gender, memberType } from "../constant/content/members";
import { listedUser } from "../constant/routers/listed";
import { useModal } from "../hooks/useModal";
import PaymentLayout from "../layout/payment.layout";
import { Register } from "../types/register";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";

function RegisterMember() {
  const [modalId, setModalId] = useState(instuctionId.photoKTP);
  const navigate = useNavigate();

  const { Modal, openModal } = useModal();

  const handleOpenModal = () => openModal(modalId);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      fotoKTP: null,
      selfieKTP: null,
      keangotaan: "",
      nik: "",
      name: "",
      gender: "",
      placeBirth: "",
      dob: new Date(),
      province: "",
      city: "",
      district: "",
      subdistrict: "",
      currentStreet: "",
      ktpStreet: "",
      payment: "",
    },
  });

  const onSubmit: SubmitHandler<Register> = (value) => {
    window.alert(JSON.stringify(value));
    reset();
    navigate(listedUser.payment, {
      state: { payment: value.payment },
    });
  };

  const { photo, title, regulation } = instructions[modalId as InstructionKey];

  return (
    <>
      <PaymentLayout>
        <div className="py-8 my-8 rounded-xl text-center space-y-3 bg-emeraldGreen">
          <h2 className="text-2xl font-medium text-white">
            Pendaftaran Anggota Koperasi
          </h2>
          <p className="text-sm tracking-wide text-white">
            Lengkapi data diri, unggah KTP, dan lakukan pembayaran <br />
            untuk bergabung menjadi anggota koperasi.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-4">
            <h2 className="font-medium tracking-wide mb-3">
              Informasi Pribadi
            </h2>
            {/* Upload KTP */}
            <div className="flex gap-4">
              <div
                onMouseEnter={() => setModalId(instuctionId.photoKTP)}
                className="flex gap-1 flex-col items-end"
              >
                <Upload
                  id="photo_ktp"
                  label="Unggah Foto KTP"
                  value={getValues("fotoKTP")}
                  className="w-[320px] h-60 hover:border-emeraldGreen"
                  onChange={(e) => setValue("fotoKTP", e)}
                />
                <div className="w-full flex justify-between mt-1">
                  <label className="text-xs text-gray-400">
                    jpeg, jpg, png, max 2mb
                  </label>
                  <button
                    onClick={handleOpenModal}
                    className="text-xs text-emeraldGreen hover:underline "
                  >
                    Instruksi
                  </button>
                </div>
              </div>
              <div
                onMouseEnter={() => setModalId(instuctionId.selfieKTP)}
                className="flex gap-1 flex-col items-end"
              >
                <Upload
                  id="selfie_ktp"
                  label={`Unggah Foto 
            Selfie dengan KTP`}
                  className="w-[320px] h-60 whitespace-pre-line hover:border-emeraldGreen"
                  value={getValues("selfieKTP")}
                  onChange={(e) => setValue("selfieKTP", e)}
                />
                <div className="w-full flex justify-between mt-1">
                  <label className="text-xs text-gray-400">
                    jpeg, jpg, png, max 2mb
                  </label>
                  <button
                    onClick={handleOpenModal}
                    className="text-right text-xs text-emeraldGreen hover:underline"
                  >
                    Instruksi
                  </button>
                </div>
              </div>
            </div>

            {/* Keanggotaan & NIK */}
            <div className="flex gap-4">
              <Select
                data={memberType}
                className="w-full"
                placeholder="Keanggotaan"
                error={errors?.keangotaan}
                {...register("keangotaan")}
              />
              <Input
                type="text"
                error={errors?.nik}
                placeholder="NIK"
                className="w-full"
                {...register("nik")}
              />
            </div>

            {/* Nama Lengkap & Jenis Kelamin */}
            <div className="flex gap-4">
              <Input
                type="text"
                error={errors?.name}
                placeholder="Nama Lengkap (Sesuai KTP)"
                {...register("name")}
              />
              <Radio
                id="gender"
                className="w-full max-w-xs"
                onChange={(e) => setValue("gender", e.value)}
                selected={getValues("gender")}
                data={gender}
                error={errors.gender}
              />
            </div>

            {/* Tempat lahir & Tanggal lahir */}
            <div className="flex gap-4">
              <Input
                type="text"
                error={errors?.placeBirth}
                placeholder="Tempat Lahir"
                {...register("placeBirth")}
              />
              <Input
                type="date"
                error={errors?.placeBirth}
                placeholder="Tanggal Lahir"
                {...register("dob")}
              />
            </div>

            {/* Provinsi & Kecamatan */}
            <div className="flex gap-4">
              <Select
                data={dummy}
                error={errors?.province}
                placeholder="Provinsi"
                {...register("province")}
              />
              <Select
                data={dummy}
                error={errors?.city}
                placeholder="City"
                {...register("city")}
              />
            </div>

            {/* Provinsi & Kecamatan */}
            <div className="flex gap-4">
              <Select
                data={dummy}
                error={errors?.district}
                placeholder="Kecamatan"
                {...register("district")}
              />
              <Select
                data={dummy}
                error={errors?.subdistrict}
                placeholder="Desa/Kelurahan"
                {...register("subdistrict")}
              />
            </div>

            {/* Alamat saat ini & Alamat KTP*/}
            <div className="flex gap-4">
              <TextArea
                error={errors?.currentStreet}
                placeholder="Alamat (Saat ini)"
                {...register("currentStreet")}
              />
              <TextArea
                error={errors?.currentStreet}
                placeholder="Alamat (Sesuai KTP)"
                {...register("ktpStreet")}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium tracking-wide">Metode Pembayaran</h2>
            <PaymentMethod
              selected={getValues("payment")}
              onChange={(item) => setValue("payment", item.value)}
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={() => handleSubmit(onSubmit)()}
            className="btn w-56 btn-primary text-white mt-10 mb-20"
          >
            Bayar Sekarang
          </button>
        </div>
      </PaymentLayout>
      <Modal id={modalId} title="Instruksi" alignTitle="left">
        {modalId && (
          <div>
            <div className="bg-gray-100 justify-center items-center rounded-lg w-full h-40 overflow-hidden mt-2 mb-3">
              <img
                className="w-auto h-40 mx-auto"
                src={photo}
                alt="Image Description"
              />
            </div>
            <div className="text-sm">
              <h4 className="mb-1 font-medium">{title}</h4>
              <ul className="px-5 space-y-1">
                {regulation.map((item) => (
                  <li key={item} className="list-disc pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default RegisterMember;
