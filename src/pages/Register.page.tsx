import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentMethod from "../components/shared/payment.component";
import Radio from "../components/ui/radio";
import Upload from "../components/ui/upload";
import {
  InstructionKey,
  instructions,
  instuctionId,
} from "../constant/content/instruction";
import { gender, memberType } from "../constant/content/members";
import { listedUser } from "../constant/routers/listed";
import { useModal } from "../hooks/useModal";
import PaymentLayout from "../layout/payment.layout";
import { Register } from "../types/register";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import SelectLocation from "@/components/ui/SelectLocation";
import { useWilayah } from "@/hooks/dataWilayah";
import { memberRest } from "@/middleware";

import { yupResolver } from "@hookform/resolvers/yup";
import { schemaMember } from "@/schema/dataMember";
import { Message } from "@/components/form/error.field";
import { MemberData } from "@/middleware/Utils";


function RegisterMember() {

  const [searchParams] = useSearchParams();
  const { Modal, openModal } = useModal();
  const navigate = useNavigate();

  const [modalId, setModalId] = useState(instuctionId.photoKTP);
  const [Id, setId] = useState('');
  const [typeMember, setTypeMember] = useState<any>();
  const [payment, setPayment] = useState<string>('');
  const type = searchParams.get('type')


  const handleOpenModal = () => openModal(modalId);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      membershipTypeId: '',
      fullName: '',
      nik: '',
      gender: '',
      pob: '',
      dob: '',
      isVerified: true,
      KtpProvince: '',
      KtpProvinceId: '',
      KtpCity: '',
      KtpCityId: '',
      KtpDistrict: '',
      KtpDistrictId: '',
      KtpSubDistrict: '',
      KtpSubDistrictId: '',
      KtpAddressDetail: '',
      addressIsDifferent: true,
      DomicileProvince: '',
      DomicileProvinceId: '',
      DomicileCity: '',
      DomicileCityId: '',
      DomicileDistrict: '',
      DomicileDistrictId: '',
      DomicileSubDistrict: '',
      DomicileSubDistrictId: '',
      DomicileAddressDetail: '',
      ktp: undefined,
      ktp_selfie: undefined,
      registrationFee: 5000,
      registrationPaymentMethod: ''
    },
    resolver: yupResolver(schemaMember),
  });

  const {
    provinsi: ktpProvinsi,
    kabupaten: ktpKabupaten,
    kecamatan: ktpKecamatan,
    kelurahan: ktpKelurahan,
    fetchKabupaten: fetchKtpKabupaten,
    fetchKecamatan: fetchKecamatan,
    fetchKelurahan: fetchKelurahan,
    fetchProvinsi: fetchProvinsi
  } = useWilayah('ktp');

  const {
    provinsi: domisiliProvinsi,
    kabupaten: domisiliKabupaten,
    kecamatan: domisiliKecamatan,
    kelurahan: domisiliKelurahan,
    fetchKabupaten: fetchDomisiliKabupaten,
    fetchKecamatan: fetchDomisiliKecamatan,
    fetchKelurahan: fetchDomisiliKelurahan,
    fetchProvinsi: fetchDomisiliProvinsi
  } = useWilayah('domisili');

  useEffect(() => {
    fetchProvinsi();
    fetchDomisiliProvinsi()
  }, [fetchProvinsi, fetchDomisiliProvinsi]);

  // KTP
  useEffect(() => {
    const id = watch("KtpProvinceId");
    fetchKtpKabupaten(id);
  }, [watch("KtpProvinceId")])

  useEffect(() => {
    const id = watch("KtpCityId");
    fetchKecamatan(id);
  }, [watch("KtpCityId")]);

  useEffect(() => {
    const id = watch("KtpDistrictId");
    fetchKelurahan(id);
  }, [watch("KtpDistrictId")]);

  // Domisili
  useEffect(() => {
    const id = watch("DomicileProvinceId");
    fetchDomisiliKabupaten(id);
  }, [watch("DomicileProvinceId")]);


  useEffect(() => {
    const id = watch("DomicileCityId");
    fetchDomisiliKecamatan(id);
  }, [watch("DomicileCityId")]);


  useEffect(() => {
    const id = watch("DomicileDistrictId");
    fetchDomisiliKelurahan(id);
  }, [watch("DomicileDistrictId")]);

  useEffect(() => {
    const fetchTypeMember = async () => {
      try {
        const response = await memberRest.getTypeMember();
        const formattedData = response.data.items.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setTypeMember(formattedData);
      } catch (error) {
        console.error("Error fetching member type:", error);
      }
    };

    fetchTypeMember();
  }, []);

  useEffect(() => {
    const addressIsDifferent = watch("addressIsDifferent");
    if (addressIsDifferent) {
      setValue("DomicileProvince", getValues("KtpProvince"));
      setValue("DomicileProvinceId", getValues("KtpProvinceId"));
      setValue("DomicileCity", getValues("KtpCity"));
      setValue("DomicileCityId", getValues("KtpCityId"));
      setValue("DomicileDistrict", getValues("KtpDistrict"));
      setValue("DomicileDistrictId", getValues("KtpDistrictId"));
      setValue("DomicileSubDistrict", getValues("KtpSubDistrict"));
      setValue("DomicileSubDistrictId", getValues("KtpSubDistrictId"));
      setValue("DomicileAddressDetail", getValues("KtpAddressDetail"));
    }
  }, [
    watch("addressIsDifferent"),
    watch("KtpAddressDetail")
  ]);

  useEffect(() => {
    if (type) {
      checkData()
    }
  }, []);


  const onSubmit: SubmitHandler<Register> = (value) => {
    memberRest.createData(value)
    setValue("registrationFee", 5000)
    setValue("registrationPaymentMethod", payment)
    const params = new URLSearchParams({
      type: payment
    });

    reset();
    navigate(`${listedUser.payment}?${params.toString()}`);
  };
  const onUpdate: SubmitHandler<Register> = (value) => {
    memberRest.updateData(value, Id)
    reset();
    navigate('/dashboard/verif');
  };


  const checkData = async () => {
    const response = await memberRest.checkData();

    if (typeof response === 'object' && response !== null && 'data' in response) {
      const dataRest = response.data as MemberData;
      setValue("membershipTypeId", dataRest.data.membershipTypeId)
      setValue("fullName", dataRest.data.fullName)
      setValue("nik", dataRest.data.nik)
      setValue("gender", dataRest.data.gender)
      setValue("pob", dataRest.data.pob)
      setValue("dob", dataRest.data.dob)
      setValue("isVerified", dataRest.data.isVerified)
      setValue("KtpProvince", dataRest.data.KtpProvince)
      setValue("KtpProvinceId", dataRest.data.KtpProvinceId)
      setValue("KtpCity", dataRest.data.KtpCity)
      setValue("KtpCityId", dataRest.data.KtpCityId)
      setValue("KtpDistrict", dataRest.data.KtpDistrict)
      setValue("KtpDistrictId", dataRest.data.KtpDistrictId)
      setValue("KtpSubDistrict", dataRest.data.KtpSubDistrict)
      setValue("KtpSubDistrictId", dataRest.data.KtpSubDistrictId)
      setValue("KtpAddressDetail", dataRest.data.KtpAddressDetail)
      setValue("addressIsDifferent", dataRest.data.addressIsDifferent)
      setValue("DomicileProvince", dataRest.data.DomicileProvince)
      setValue("DomicileProvinceId", dataRest.data.DomicileProvinceId)
      setValue("DomicileCity", dataRest.data.DomicileCity)
      setValue("DomicileCityId", dataRest.data.DomicileCityId)
      setValue("DomicileDistrict", dataRest.data.DomicileDistrict)
      setValue("DomicileDistrictId", dataRest.data.DomicileDistrictId)
      setValue("DomicileSubDistrict", dataRest.data.DomicileSubDistrict)
      setValue("DomicileSubDistrictId", dataRest.data.DomicileSubDistrictId)
      setValue("DomicileAddressDetail", dataRest.data.DomicileAddressDetail)
      setId(dataRest.data.id)
    } else {
      console.error('Invalid response structure', response);
    }
  };

  const { photo, title, regulation } = instructions[modalId as InstructionKey];

  return (
    <>
      <PaymentLayout>
        <div className="py-8 my-8 rounded-xl text-center space-y-3">
          <h2 className="text-2xl font-medium ">
            Pendaftaran Anggota Koperasi
          </h2>
          <p className="text-sm tracking-wide ">
            Lengkapi data diri, unggah KTP, dan lakukan pembayaran <br />
            untuk bergabung menjadi anggota koperasi.
          </p>
        </div>


        <div className="gap-5 px-3 sm:p-10">
          <div className="bg-white p-3 rounded-md">

            <div className="space-y-4">
              <h2 className="font-medium tracking-wide mb-3">
                Informasi Pribadi
              </h2>
              {/* Upload KTP */}
              <div className="flex gap-4 flex-col sm:flex-row justify-center">
                <div
                  onMouseEnter={() => setModalId(instuctionId.photoKTP)}
                  className="flex gap-1 flex-col items-end justify-center"
                >
                  <Upload
                    id="photo_ktp"
                    label="Unggah Foto KTP"
                    value={watch("ktp")}
                    className="w-[320px] h-60 hover:border-emeraldGreen"
                    onChange={(e) => setValue("ktp", e)}
                  />
                  <div className="w-full justify-start">

                    <Message
                      isError={Boolean(errors?.ktp)}
                      message={errors?.ktp?.message || " "}
                    />
                  </div>
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
                    id="ktp_selfie"
                    label={`Unggah Foto Selfie dengan KTP`}
                    className="w-[320px] h-60 whitespace-pre-line hover:border-emeraldGreen"
                    value={watch("ktp_selfie")}
                    onChange={(e) => setValue("ktp_selfie", e)}
                  />
                  <div className="w-full justify-start">

                    <Message
                      isError={Boolean(errors?.ktp_selfie)}
                      message={errors?.ktp_selfie?.message || " "}
                    />
                  </div>
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
              <div className="flex gap-4  flex-col sm:flex-row">
                <div className="w-full">
                  <label htmlFor="">Jenis Keanggotaan</label>
                  <Select
                    data={typeMember}
                    className="w-full"
                    placeholder="Keanggotaan"
                    error={errors?.membershipTypeId}
                    {...register("membershipTypeId")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">NIK</label>
                  <Input
                    type="text"
                    error={errors?.nik}
                    placeholder="NIK"
                    className="w-full"
                    {...register("nik")}
                  />
                </div>


              </div>

              {/* Nama Lengkap & Jenis Kelamin */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full">
                  <label htmlFor="">Nama Lengkap (Sesuai KTP)</label>
                  <Input
                    type="text"
                    error={errors?.fullName}
                    placeholder="Nama Lengkap (Sesuai KTP)"
                    {...register("fullName")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Jenis Kelamin</label>
                  <Radio
                    id="gender"
                    className="w-full "
                    onChange={(e) => setValue("gender", e.value)}
                    selected={getValues("gender")}
                    data={gender}
                    error={errors.gender}
                  />
                </div>


              </div>

              {/* Tempat lahir & Tanggal lahir */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full">
                  <label htmlFor="">Tempat Lahir</label>
                  <Input
                    type="text"
                    error={errors?.pob}
                    placeholder="Tempat Lahir"
                    {...register("pob")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Tanggal Lahir</label>
                  <Input
                    type="date"
                    error={errors?.dob}
                    placeholder="Tanggal Lahir"
                    {...register("dob")}
                  />
                </div>


              </div>

            </div>
            <div className="space-y-4 mt-10">
              <h2 className="font-medium tracking-wide mb-3">
                Alamat Sesuai KTP
              </h2>

              {/* Provinsi & Kecamatan */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full">
                  <label htmlFor="">Provinsi</label>
                  <SelectLocation
                    data={ktpProvinsi}
                    error={errors?.KtpProvinceId}
                    placeholder="Pilih Provinsi"
                    {...register("KtpProvinceId", {
                      onChange: (e) => {
                        const selectedValue = e.target.value;
                        const selectedProvince = ktpProvinsi.find((p) => p.id === selectedValue);
                        setValue("KtpProvinceId", selectedValue);
                        setValue("KtpProvince", selectedProvince?.name || "");
                      },
                    })}
                    onChangeCallback={(value) => {
                      const selectedProvince = ktpProvinsi.find((p) => p.id === value);
                      setValue("KtpProvinceId", value);
                      setValue("KtpProvince", selectedProvince?.name || "");
                    }}
                  />

                </div>
                <div className="w-full">
                  <label htmlFor="">Kabupaten / Kota</label>
                  <SelectLocation
                    data={ktpKabupaten}
                    error={errors?.KtpCityId}
                    placeholder="Pilih Kabupaten"
                    {...register("KtpCityId", {
                      onChange: (e) => {
                        const selectedValue = e.target.value;
                        const selected = ktpKabupaten.find((p) => p.id === selectedValue);
                        setValue("KtpCityId", selectedValue);
                        setValue("KtpCity", selected?.name || "");
                      },
                    })}
                    onChangeCallback={(value) => {
                      const selected = ktpKabupaten.find((p) => p.id === value);
                      setValue("KtpCityId", value);
                      setValue("KtpCity", selected?.name || "");
                    }}
                  />

                </div>


              </div>
              {/* Provinsi & Kecamatan */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full">
                  <label htmlFor="">Kecamatan</label>
                  <SelectLocation
                    data={ktpKecamatan}
                    error={errors?.KtpCityId}
                    placeholder="Pilih Kecamatan"
                    {...register("KtpDistrictId", {
                      onChange: (e) => {
                        const selectedValue = e.target.value;
                        const selected = ktpKecamatan.find((p) => p.id === selectedValue);
                        setValue("KtpDistrictId", selectedValue);
                        setValue("KtpDistrict", selected?.name || "");
                      },
                    })}
                    onChangeCallback={(value) => {
                      const selected = ktpKecamatan.find((p) => p.id === value);
                      setValue("KtpDistrictId", value);
                      setValue("KtpDistrict", selected?.name || "");
                    }}

                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Kelurahan</label>
                  <SelectLocation
                    data={ktpKelurahan}
                    error={errors?.KtpSubDistrictId}
                    placeholder="Pilih Kecamatan"
                    {...register("KtpSubDistrictId", {
                      onChange: (e) => {
                        const selectedValue = e.target.value;
                        const selected = ktpKelurahan.find((p) => p.id === selectedValue);
                        setValue("KtpSubDistrictId", selectedValue);
                        setValue("KtpSubDistrict", selected?.name || "");
                      },
                    })}
                    onChangeCallback={(value) => {
                      const selected = ktpKelurahan.find((p) => p.id === value);
                      setValue("KtpSubDistrictId", value);
                      setValue("KtpSubDistrict", selected?.name || "");
                    }}

                  />
                </div>


              </div>


              <div className="flex flex-col w-full sm:w-1/2">
                <label htmlFor="">Detail Alamat</label>
                <TextArea
                  error={errors?.KtpAddressDetail}
                  placeholder="Detail Alamat"
                  className="w-full"
                  {...register("KtpAddressDetail")}
                />

              </div>
            </div>
            <div className="space-y-4 mt-10">
              <h2 className="font-medium tracking-wide mb-3">
                Alamat Domisili
              </h2>
              <label className="cursor-pointer label flex justify-start gap-3">
                <input type="checkbox" checked={watch("addressIsDifferent")}  {...register("addressIsDifferent")} className="checkbox checkbox-accent" />
                <span className="label-text">Sama Seperti alamat KTP</span>
              </label>
              {
                !watch("addressIsDifferent") &&
                <div className="space-y-4">

                  {/* Provinsi & Kecamatan */}
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="w-full">
                      <label htmlFor="">Provinsi</label>
                      <SelectLocation
                        data={domisiliProvinsi}
                        error={errors?.KtpProvinceId}
                        placeholder="Pilih Provinsi"
                        {...register("DomicileProvinceId", {
                          onChange: (e) => {
                            const selectedValue = e.target.value;
                            const selected = domisiliProvinsi.find((p) => p.id === selectedValue);
                            setValue("DomicileProvinceId", selectedValue);
                            setValue("DomicileProvince", selected?.name || "");
                          },
                        })}
                        onChangeCallback={(value) => {
                          const selected = domisiliProvinsi.find((p) => p.id === value);
                          setValue("DomicileProvinceId", value);
                          setValue("DomicileProvince", selected?.name || "");
                        }}

                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Kabupaten / Kota</label>
                      <SelectLocation
                        data={domisiliKabupaten}
                        error={errors?.KtpCityId}
                        placeholder="Pilih Kabupaten"
                        {...register("DomicileCityId", {
                          onChange: (e) => {
                            const selectedValue = e.target.value;
                            const selected = domisiliKabupaten.find((p) => p.id === selectedValue);
                            setValue("DomicileCityId", selectedValue);
                            setValue("DomicileCity", selected?.name || "");
                          },
                        })}
                        onChangeCallback={(value) => {
                          const selected = domisiliKabupaten.find((p) => p.id === value);
                          setValue("DomicileCityId", value);
                          setValue("DomicileCity", selected?.name || "");
                        }}

                      />
                    </div>


                  </div>

                  {/* Provinsi & Kecamatan */}
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="w-full">
                      <label htmlFor="">Kecamatan</label>
                      <SelectLocation
                        data={domisiliKecamatan}
                        error={errors?.KtpDistrictId}
                        placeholder="Pilih Kecamatan"
                        {...register("DomicileDistrictId", {
                          onChange: (e) => {
                            const selectedValue = e.target.value;
                            const selected = domisiliKecamatan.find((p) => p.id === selectedValue);
                            setValue("DomicileDistrictId", selectedValue);
                            setValue("DomicileDistrict", selected?.name || "");
                          },
                        })}
                        onChangeCallback={(value) => {
                          const selected = domisiliKecamatan.find((p) => p.id === value);
                          setValue("DomicileDistrictId", value);
                          setValue("DomicileDistrict", selected?.name || "");
                        }}

                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Kelurahan</label>
                      <SelectLocation
                        data={domisiliKelurahan}
                        error={errors?.KtpSubDistrictId}
                        placeholder="Pilih Kecamatan"
                        {...register("DomicileSubDistrictId", {
                          onChange: (e) => {
                            const selectedValue = e.target.value;
                            const selected = domisiliKelurahan.find((p) => p.id === selectedValue);
                            setValue("DomicileSubDistrictId", selectedValue);
                            setValue("DomicileSubDistrict", selected?.name || "");
                          },
                        })}
                        onChangeCallback={(value) => {
                          const selected = domisiliKelurahan.find((p) => p.id === value);
                          setValue("DomicileSubDistrictId", value);
                          setValue("DomicileSubDistrict", selected?.name || "");
                        }}

                      />
                    </div>


                  </div>

                  {/* Alamat saat ini & Alamat KTP*/}
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="">Detail Alamat</label>
                    <TextArea
                      error={errors?.DomicileAddressDetail}
                      placeholder="Detail Alamat"
                      className="w-full"
                      {...register("DomicileAddressDetail")}
                    />


                  </div>
                </div>
              }
            </div>

          </div>
          <div className="space-y-4 flex-col sm:flex-row bg-white mt-10 p-3 rounded-md">
            <h2 className="font-medium tracking-wide">Metode Pembayaran</h2>
            <PaymentMethod
              selected={payment}
              onChange={(item) => setPayment(item.value)}
            />
          </div>
        </div>
        <div className="w-full text-center">
          {
            type &&

            <button
              onClick={() => handleSubmit(onUpdate)()}
              className="btn w-56 btn-ghost bg-emeraldGreen text-white mt-10 mb-20"
            >
              Update Data
            </button>
          }
          {
            !type &&

            <button
              onClick={() => handleSubmit(onSubmit)()}
              className="btn w-56 btn-ghost bg-emeraldGreen text-white mt-10 mb-20"
            >
              Bayar Sekarang
            </button>
          }

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
