import getErrorMessage from "@/helper/apiHelper";
import { authApi, datawilayahIndonesia } from "./Rest"
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
            return await authApi.register(data)

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
            const role = 'ADMIN'
            useAuthStore.getState().setAuth({ accessToken: at, refreshToken: rt, role: role });

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

