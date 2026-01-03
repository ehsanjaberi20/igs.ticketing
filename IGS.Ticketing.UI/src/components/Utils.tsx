import {toast} from 'sonner';
import type {IApiError} from "@/api/api.ts";

export const Utils = {
    notify: (message: string, type: 'error' | 'info', description: string = ""): void => {
        toast[type](message, {
            description: description.length > 0 ? <div className='whitespace-pre-line'>{description}</div> : null,
        });
    },
    notifyException: (error: IApiError): void => {
        let description: string = "";
        if (error.code === "VALIDATION_ERROR")
            description = Object.values(error.details).map((value) => `* ${value}`).join("\n");
        Utils.notify(error.message, "error", description);
    }
}