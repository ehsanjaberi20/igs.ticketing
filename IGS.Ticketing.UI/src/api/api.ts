import axios, {type AxiosError, type AxiosResponse} from "axios";

export const API = axios.create({
    baseURL: "http://localhost:5054/api",
    withCredentials: true,
});
export interface IApiError {
    message: string;
    status?: number;
}
API.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        console.log(error);
        const apiError: IApiError = { message: "Something went wrong" };

        if (error.response) {
            apiError.status = error.response.status;
            apiError.message = error.response.data?.message || error.message;

            // مثال: اگر توکن منقضی شده باشد
            if (error.response.status === 401) {
                // می‌توانید اینجا refresh token بزنید یا کاربر را logout کنید
                console.log("Unauthorized! Maybe refresh token is needed");
            }
        } else if (error.request) {
            apiError.message = "خطا در برقراری ارتباط با سرور، لطفا دوباره تلاش کنید";
        } else {
            apiError.message = error.message;
        }
        return Promise.reject(apiError);
    }
);