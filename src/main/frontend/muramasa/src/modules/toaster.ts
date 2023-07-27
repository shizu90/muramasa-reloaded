import { toast } from "react-hot-toast";

export default {
    success: (msg: string) => {
        toast(msg, {className: "bg-green-600 text-slate-50 font-medium"});
    },
    error: (msg: string) => {
        toast(msg, {className: "bg-rose-500 text-slate-50 font-medium"});
    }
}