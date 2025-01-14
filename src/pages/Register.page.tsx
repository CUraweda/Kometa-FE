import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../component/shared/payment.component";
import Radio from "../component/ui/radio";
import Upload from "../component/ui/upload";
import {
  InstructionKey,
  instructions,
  instuctionId,
} from "../constant/content/instruction";
import { dummy, gender, memberType } from "../constant/content/members";
import { listed } from "../constant/routers/listed";
import { useModal } from "../hooks/useModal";
import PaymentLayout from "../layout/Payment.layout";
import { Register } from "../types/register";

function RegisterMember() {
  const [modalId, setModalId] = useState(instuctionId.photoKTP);
  const navigate = useNavigate();

  const { Modal, openModal } = useModal();

  const handleOpenModal = () => openModal(modalId);

  const { register, setValue, getValues, handleSubmit, reset } =
    useForm<Register>({
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
    navigate(listed.payment, { state: { payment: value.payment } });
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
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("keangotaan")}
              >
                <option value="" disabled selected>
                  Keanggotaan
                </option>
                {memberType.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="NIK"
                className="input input-bordered w-full max-w-xs"
                {...register("nik")}
              />
            </div>

            {/* Nama Lengkap & Jenis Kelamin */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Nama Lengkap (Sesuai KTP)"
                className="input input-bordered w-full max-w-xs"
                {...register("name")}
              />
              <Radio
                id="gender"
                className="w-full max-w-xs"
                onChange={(e) => setValue("gender", e.value)}
                selected={getValues("gender")}
                data={gender}
              />
            </div>

            {/* Tempat lahir & Tanggal lahir */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Tempat Lahir"
                className="input input-bordered w-full max-w-xs"
                {...register("placeBirth")}
              />
              <input
                type="date"
                placeholder="Tanggal Lahir"
                className="input input-bordered w-full max-w-xs"
                {...register("dob")}
              />
            </div>

            {/* Provinsi & Kecamatan */}
            <div className="flex gap-4">
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("province")}
              >
                <option value="" disabled selected>
                  Provinsi
                </option>
                {dummy.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("city")}
              >
                <option value="" disabled selected>
                  Kota/Kabupaten
                </option>
                {dummy.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Provinsi & Kecamatan */}
            <div className="flex gap-4">
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("district")}
              >
                <option value="" disabled selected>
                  Kecamatan
                </option>
                {dummy.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("subdistrict")}
              >
                <option value="" disabled selected>
                  Desa/Kelurahan
                </option>
                {dummy.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Alamat saat ini & Alamat KTP*/}
            <div className="flex gap-4">
              <textarea
                rows={2}
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Alamat (Saat ini)"
                {...register("currentStreet")}
              ></textarea>
              <textarea
                rows={2}
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Alamat (Sesuai KTP)"
                {...register("ktpStreet")}
              ></textarea>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium tracking-wide">Metode Pembayaran</h2>
           <PaymentMethod selected={getValues("payment")} onChange={(item) => setValue("payment", item.value)} />
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
