import getErrorMessage from "@/helper/apiHelper";
import { authApi, datawilayahIndonesia, restAnggota } from "./Rest"
import { Login, Register } from "./Utils";
import Swal from 'sweetalert2'
import useAuthStore from "@/store/auth.store";


export const datawilayah = {
    dataProvinsi: async () => {
        try {
            const provinsi = await datawilayahIndonesia.provinsi();
            return provinsi;
        } catch (error) {
            throw error;
        }
    },
    dataKabupaten: async (id: string) => {
        try {
            const provinsi = await datawilayahIndonesia.kabupaten(id);
            return provinsi;
        } catch (error) {
            throw error;
        }
    },
    dataKecamatan: async (id: string) => {
        try {
            const provinsi = await datawilayahIndonesia.kecamatan(id);
            return provinsi;
        } catch (error) {
            throw error;
        }
    },
    dataKelurahan: async (id: string) => {
        try {
            const provinsi = await datawilayahIndonesia.kelurahan(id);
            return provinsi;
        } catch (error) {
            throw error;
        }
    }
};

export const authentication = {
    register: async (data: Register) => {
        try {
            await authApi.register(data)
            Swal.fire({
                icon: "success",
                title: "Signup Berhasil",
                text: 'silakan login untuk mengakses akun anda',
            });
            return 200
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'Register failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'Register failed. Please try again.'));
        }
    },
    login: async (data: Login) => {
        try {
            const response = await authApi.login(data)
            const { at, rt } = response.data.data.token;
            const role = response.data.data.user.role.code
            useAuthStore.getState().setAuth({ accessToken: at, refreshToken: rt, role: role });
            return role
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'Login failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'Login failed. Please try again.'));
        }
    },
}

export const memberRest = {
    getTypeMember: async () => {
        try {
            const response = await restAnggota.typeMember()
            return response.data
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    createData: async (data: any) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const response = await restAnggota.createMemberData(formData)
            return response
            return 
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    checkData : async () => {
        try {
            await restAnggota.checkMember()
            return 200
        } catch (error) {
            return error
        }
    }
}
