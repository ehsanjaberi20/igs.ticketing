import axios, {type AxiosError, type AxiosResponse} from "axios";

export const API = axios.create({
    baseURL: "http://localhost:5054/api",
    withCredentials: true,
});
export interface IApiError {
    code?: string | "VALIDATION_ERROR";
    message: string;
    status?: number;
    details?: object;
}
API.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<{error: {code: string, message: string, details: any}}>) => {
        // comment
        const apiError: IApiError = { message: "Something went wrong" };
        apiError.code = error.code;
        apiError.status = error.status;

        if (error.response) {
            apiError.code = error.response.data?.error?.code  || error.code;
            apiError.message = error.response.data?.error?.message  || error.message;
            apiError.details = error.response.data?.error?.details  || {};

            if (error.response.status === 401) {
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