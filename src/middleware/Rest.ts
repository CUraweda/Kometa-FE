import axios, {
  AxiosPromise,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { LandData, Login, LoginResponse, MemberData, MembershipTypeResponse,  provinces, Register, typeGetAllMember, verifMember } from "./Utils";
import useAuthStore from "../store/auth.store"; // Zustand store untuk auth

const server = axios.create({ baseURL: 'https://api-kometa.curaweda.com/' });
// const server = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });
const datawilayah = axios.create({
  baseURL: "https://www.emsifa.com/api-wilayah-indonesia/api/",
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
// Interceptor untuk request
server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk response
server.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Tandai permintaan ini sudah di-retry

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("Refresh token is missing");
        }

        const refreshResponse = await server.post("api/auth/refresh", {
          refreshToken,
        });

        const { at: newAccessToken, rt: newRefreshToken } = refreshResponse.data;

        // Simpan token baru di localStorage
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        // Perbarui header Authorization dengan token baru
        if (!originalRequest.headers) {
          originalRequest.headers = {} as AxiosRequestHeaders;
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Ulangi permintaan asli
        return server(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);

        // Bersihkan status login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


// API untuk Data Wilayah Indonesia
export const datawilayahIndonesia = {
  provinsi: (): AxiosPromise<provinces> =>
    datawilayah({
      method: "GET",
      url: "provinces.json",
    }),
  kabupaten: (id: string): AxiosPromise<provinces> =>
    datawilayah({
      method: "GET",
      url: `regencies/${id}.json`,
    }),
  kecamatan: (id: string): AxiosPromise<provinces> =>
    datawilayah({
      method: "GET",
      url: `districts/${id}.json`,
    }),
  kelurahan: (id: string): AxiosPromise<provinces> =>
    datawilayah({
      method: "GET",
      url: `villages/${id}.json`,
    }),
};

// API untuk Authentication
export const authApi = {
  register: (data: Register): AxiosPromise<Register> =>
    server({
      method: "POST",
      url: "api/auth/register",
      data,
    }),
  login: (data: Login): AxiosPromise<LoginResponse> =>
    server({
      method: "POST",
      url: "api/auth/login",
      data,
    }),
};

export const authUser = {
  profil: (): AxiosPromise<any> =>
    server({
      method: "GET",
      url: ''
    })
}

export const restAnggota = {
  typeMember: (): AxiosPromise<MembershipTypeResponse> =>
    server({
      method: "GET",
      url: 'api/membership/show-all'
    }),
  checkMember: (): AxiosPromise<MemberData> =>
    server({
      method: "GET",
      url: 'api/member-data/show-by-user',
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  createMemberData: (data: any): AxiosPromise<any> =>
    server({
      method: "POST",
      url: 'api/member-data/create',
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        "Content-Type": "multipart/form-data",
      },

    }),
  getAll: (payload: string): AxiosPromise<typeGetAllMember> =>
    server({
      method: "GET",
      url: `api/member-data/show-all?${payload}`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  getOne: (payload: string | null): AxiosPromise<MemberData> =>
    server({
      method: "GET",
      url: `api/member-data/show-one/${payload}`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  verif: (data: verifMember, id: string): AxiosPromise<MemberData> =>
    server({
      method: "PUT",
      url: `api/member-data/verify/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  update: (data: any, id: string): AxiosPromise<any> =>
    server({
      method: "PUT",
      url: `api/member-data/update/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    })
}

export const previewImage = {
  get: (path: string): AxiosPromise<any> =>
    server({
      method: "GET",
      url: `api/download?path=${path}`,
      responseType: "arraybuffer",
    })
}

export const restLand = {
  create: (data: any): AxiosPromise<LandData> =>
    server({
      method: "POST",
      url: `api/land-data/create`,
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }),
  getAllByUser: (id: string | null): AxiosPromise<LandData> =>
    server({
      method: "GET",
      url: `api/land-data/show-all?memberId=${id}&limit=100`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  getAll: (params?: string): AxiosPromise<LandData> =>
    server({
      method: "GET",
      url: `api/land-data/show-all?${params}`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  getOne: (id?: string): AxiosPromise<LandData> =>
    server({
      method: "GET",
      url: `api/land-data/show-one/${id}`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  approv: (data: verifMember, id?: string): AxiosPromise<LandData> =>
    server({
      method: "PUT",
      url: `api/land-data/decision/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  edit: (data: LandData, id?: string): AxiosPromise<LandData> =>
    server({
      method: "PUT",
      url: `api/land-data/update/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    })
}


export const paymentRest = {
  generatePayment: (data: any): AxiosPromise<any> =>
    server({
      method: "POST",
      url: `api/member-data/generate-payment`,
      data,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  getStatusPayment: (id: string | null): AxiosPromise<any> =>
    server({
      method: "GET",
      url: `api/payment-history/show-one/${id}`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),

}

export const dashboarRest = {
  codeProvince: (): AxiosPromise<any> =>
    server({
      method: "GET",
      url: `api/dashboard/count-province-code`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  codeDataProvince: (): AxiosPromise<any> =>
    server({
      method: "GET",
      url: `api/dashboard/count-province`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  dataStatistik: (): AxiosPromise<any> =>
    server({
      method: "GET",
      url: `api/dashboard/count-statistic`,
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),

}