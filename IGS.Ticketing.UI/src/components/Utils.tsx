//import toast from 'react-hot-toast';
import { toast } from 'sonner';
export const Utils = {
    notify: (message: string): void => {
        toast.error(message);
    }
}