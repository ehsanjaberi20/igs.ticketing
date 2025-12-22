import {toast} from 'sonner';
import type {IApiError} from "@/api/api.ts";

export const Utils = {
    notify: (message: string, type: 'error' | 'info'): void => {
        toast[type](message);
    },
    notifyException: (error: IApiError): void => {
        let description: string = "";
        if (error.code === "VALIDATION_ERROR")
            description = Object.values(error.details).map((value) => `* ${value}`).join("\n");
        toast.error(<span  style={{
            fontFamily: 'Vazirmatn FD'
        }}>{error.message}</span>, {
            description: description.length > 0 ? <div className='whitespace-pre-line' style={{
                fontFamily: 'Vazirmatn FD'
            }}>{description}</div> : null,
        });
    }

}