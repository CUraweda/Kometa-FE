import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Message } from '../components/form/error.field';
import { commonMessage } from '../constant/form/validation.message';
import { Profile } from '../types/user';
import CenterLayout from '@/layout/center.layout';
import { useEffect, useState } from 'react';
import {  restAnggota } from '@/middleware/Rest';
import { dataMember, dataUser } from '@/middleware';
import { MemberData } from '@/middleware/Utils';

import { formatDateString } from '@/utils/formatDate';
import ModalDetail, { closeModal, openModal } from '@/components/ui/ModalDetail';
import Input from '@/components/ui/input';

function ProfilePage() {
  const [data, setData] = useState<MemberData>();
  const [images, setImages] = useState<{ index: number; src: string }[]>([]);

  const getDataUser = async () => {
    try {
      const { data } = await restAnggota.checkMember();
      setData(data);

      loadImages(data.data.MemberFile);
      setValue('fullName', data.data.fullName);
      setValue('email', data.data.user.email);
      setValue('phoneWA', data.data.user.phoneWA);
    } catch (error) {
      console.log(error);
    }
  };
  const loadImages = async (props: any) => {
    const allowedFilePaths = { profile: true };
    const image = await dataMember.loadImage(props, allowedFilePaths);
    setImages(image ?? []);
  };
  useEffect(() => {
    getDataUser();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(
      yup.object().shape({
        fullName: yup.string().required(commonMessage.nameRequired),
        phoneWA: yup
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
      fullName: '',
      phoneWA: '',
      email: '',
    },
  });

 
  const onSubmit: SubmitHandler<Profile> = async (value) => {
    await dataUser.updateData(value)
    reset();
    getDataUser()
    closeModal('edit-profil')
  };

  return (
    <CenterLayout className="min-h-[calc(100vh-105px)]">
      <div className="w-full min-h-[calc(100vh-105px)] flex flex-col sm:flex-row p-3 shadow-md rounded-md">
        <div className="w-full sm:w-2/5 p-3 flex justify-start flex-col items-center">
          <div className="w-full flex flex-col items-center gap-3 p-5">
            <div className="w-1/3 rounded-full">
              <img
                src={
                  images[0]?.src ??
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                }
                className="rounded-full"
              />
            </div>
            <span
              style={{
                backgroundColor: data?.data?.membershipType.backgroundColor,
                color: data?.data?.membershipType.foregroundColor,
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              {data?.data?.membershipType.name}
            </span>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Nama Lengkap
              </label>
              <p className="py-2 px-3 border border-input rounded-md">
                {data?.data.fullName}
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Email
              </label>
              <p className="py-2 px-3 border border-input rounded-md">
                {data?.data.user.email}
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Nomor Handphone
              </label>
              <p className="py-2 px-3 border border-input rounded-md">
                {data?.data.user.phoneWA}
              </p>
            </div>
            <button
              className="btn btn-ghost bg-emeraldGreen text-white w-32"
              onClick={() => openModal('edit-profil')}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <span className="font-bold">Data Anggota</span>
          <div className="overflow-x-auto mt-5">
            <table className="table">
              <tbody>
                <tr>
                  <td className="bg-gray-100">Nama Lengkap</td>
                  <td>{data?.data.fullName}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">NIK</td>
                  <td>{data?.data.nik}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Jenis Kelamin</td>
                  <td>
                    {data?.data?.gender == 'L' ? 'laki-laki' : 'perempuan'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Tempat Lahir</td>
                  <td>{data?.data?.pob}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Tanggal Lahir</td>
                  <td>{formatDateString(data?.data.dob)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="my-5" />
          <span className="font-bold">Data Alamat Sesuai KTP</span>
          <div className="overflow-x-auto mt-5">
            <table className="table">
              <tbody>
                <tr>
                  <td className="bg-gray-100">Provinsi</td>
                  <td>{data?.data.KtpProvince}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Kota / Kabupaten</td>
                  <td>{data?.data.KtpCity}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Kecamatan</td>
                  <td>{data?.data?.KtpDistrict}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Kelurahan</td>
                  <td>{data?.data?.KtpSubDistrict}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Alamat Lengkap</td>
                  <td>{data?.data.KtpAddressDetail}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="my-5" />
          <span className="font-bold">Data Alamat Domisili</span>
          <div className="overflow-x-auto mt-5">
            <table className="table">
              <tbody>
                <tr>
                  <td className="bg-gray-100">Provinsi</td>
                  <td>{data?.data.DomicileProvince}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Kota / Kabupaten</td>
                  <td>{data?.data.DomicileCity}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Kecamatan</td>
                  <td>{data?.data?.DomicileDistrict}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Kelurahan</td>
                  <td>{data?.data?.DomicileSubDistrict}</td>
                </tr>
                <tr>
                  <td className="bg-gray-100">Alamat Lengkap</td>
                  <td>{data?.data.KtpAddressDetail}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalDetail id="edit-profil">
        <span className="mb-5 font-semibold">Edit Profil</span>
        <form
          className="flex flex-col w-full space-y-4 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-control w-full">
            <Input
              type="text"
              error={errors?.fullName}
              placeholder="Nama Lengkap"
              className="w-full"
              {...register('fullName')}
            />
          </label>
          <Message
            isError={Boolean(errors.fullName)}
            message={errors.fullName?.message}
          />

          <label className="form-control w-full">
            <Input
              type="text"
              error={errors?.phoneWA}
              placeholder="Nomor HP"
              className="w-full"
              {...register('phoneWA')}
            />
          </label>
          <Message
            isError={Boolean(errors.phoneWA)}
            message={errors.phoneWA?.message}
          />

          <label className="form-control w-full">
            <Input
              type="text"
              error={errors?.email}
              placeholder="Email"
              className="w-full"
              {...register('email')}
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
      </ModalDetail>
    </CenterLayout>
  );
}

export default ProfilePage;
