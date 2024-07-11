import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toaster1 {
    TOAST=(message, type) =>{
        if (type === "error") {
            toast.error(message, {
                className: 'toaster-styling',
              });
        } else if (type === "success") {
            toast.success(message, {
                className: 'toaster-styling',
              });
        }
    }

}
export const Toaster = new Toaster1();