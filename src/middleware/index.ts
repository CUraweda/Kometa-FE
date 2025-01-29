import getErrorMessage from "@/helper/apiHelper";
import { authApi, datawilayahIndonesia, previewImage, restAnggota, restLand } from "./Rest"
import { LandData, Login, Register, verifMember } from "./Utils";
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
            const id = response.data.data.user.id
            useAuthStore.getState().setAuth({ accessToken: at, refreshToken: rt, role: role, id });
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
            const response = await restAnggota.checkMember()
            return response
        } catch (error) {
            return error
        }
    },
    getAll : async (payload: string) => {
        try {
            const response = await restAnggota.getAll(payload)
            return response
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    getById : async (payload: string | null) => {
        try {
            const response = await restAnggota.getOne(payload)
            return response
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    verifAnggota : async (data: verifMember, id: string) => {
        try {
            const response = await restAnggota.verif(data, id)
            Swal.fire({
                title: "Success!",
                text: "Berhasil Update Status Anggota",
                icon: "success"
              });
            return response
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    }
}

export const dataMember = {
    getFile: async (path: string): Promise<string | undefined> => {
        try {
            
            const response = await previewImage.get(path);
            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl; // Kembalikan URL gambar
        } catch (error) {
            console.error("Show File Error:", error);
            return undefined;
        }
    },
};

export const landApi = {
    create : async ( data : LandData) : Promise<any> => {
        try {
            const response = await restLand.create(data)
            Swal.fire({
                title: "Success!",
                text: "Berhasil menambahkan data lahan",
                icon: "success"
              });
              
            return response
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    getAllByMember : async (id: string | null) : Promise<any> => {
        try {
            return await restLand.getAllByUser(id)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    getAll : async (params?: string) : Promise<any> => {
        try {
            return await restLand.getAll(params)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    getOne : async (id?: any) : Promise<any> => {
        try {
            return await restLand.getOne(id)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    },
    verif : async (data: verifMember, id: string) => {
        try {
            const response = await restLand.approv(data, id)
            Swal.fire({
                title: "Success!",
                text: "Berhasil Update Status Anggota",
                icon: "success"
              });
            return response
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: getErrorMessage(error, 'failed. Please try again.'),
            });
            throw new Error(getErrorMessage(error, 'failed. Please try again.'));
        }
    }
}