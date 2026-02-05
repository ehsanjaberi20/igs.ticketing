import {API} from "@/api/api.ts";
import type {User} from "@/pages/users/types.ts";

const fillGrid = async (pageNumber: number, pageSize: number, sortBy: string, search: string) => {
    const response = await API.post<User[]>("/users/fillgrid", {pageNumber, pageSize, sortBy, search});
    return response.data;
}
export { fillGrid }