import React, {type JSX, useState} from "react";
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri";
import {useAuth} from "../../context/AuthContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "sonner";

export default function Login(): JSX.Element {
    const { loginUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    function validate() {
        const e: typeof errors = {};
        if (!username) e.username = "نام کاربری را وارد کنید";

        if (!password) e.password = "رمز عبور را وارد کنید";
        // else if (password.length < 6) e.password = "رمز حداقل باید ۶ کاراکتر باشد";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        toast.error("پیام دریافتی از سرور", {
            richColors: true,
            closeButton: true,
            //unstyled: true,
            description: "بروز خطای ناشناخته لطفا با مدیر سیستم تماس بگیرید",
            // action: {
            //     label: "Undo",
            //     onClick: () => console.log("Undo"),
            // },
        })
        return;
        if (!validate()) return;
        setLoading(true);
        try {
            await loginUser(username, password);
            // شبیه‌سازی ارسال فرم (در پروژه واقعی این‌جا درخواست به API می‌رود)
            //await new Promise((r) => setTimeout(r, 800));
            setLoading(false);
            //alert("ورود موفق — این یک نمونه است!");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
            <div
                className="sm:w-full md:max-w-1/2 lg:max-w-1/3 xl:max-w-1/4  w-full grid grid-cols-1 gap-8 items-center">
                <main
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 mb-2 md:p-12 md:pb-3 border border-transparent dark:border-slate-800">
                    <div className="flex items-center justify-between mb-6">
                        <div className='w-full text-center'>
                            <h1 className="text-2xl font-bold mb-2">ورود به حساب</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">نام کاربری و رمز عبور خود را وارد
                                کنید</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">نام کاربری</span>
                            {/*<div*/}
                            {/*    className={`mt-1 relative rounded-xl border ${errors.username ? 'border-rose-400' : 'border-indigo-300'} focus-within:ring-2 focus-within:ring-indigo-300`}>*/}
                                <Input
                                    size={5}
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="نام کاربری"
                                    className="h-12"
                                    //className="w-full px-4 p-3 rounded-xl bg-transparent outline-none"
                                    aria-invalid={!!errors.username}
                                />
                            {/*</div>*/}
                            {errors.username && <p className="mt-1 text-rose-500 text-sm">{errors.username}</p>}
                        </label>

                        <label className="block">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-300">رمز عبور</span>

                            </div>

                            <div
                                //className={`mt-1 relative rounded-xl border ${errors.password ? 'border-rose-400' : 'border-indigo-300'} focus-within:ring-2 focus-within:ring-indigo-300`}
                                className={`mt-1 relative`}
                                >
                                <span
                                    onClick={() => {
                                        setShowPassword((s) => !s)
                                    }}
                                    className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 px-2 py-1"
                                >
                                    {!showPassword ? (
                                        <span><RiEyeCloseLine size={20}/></span>
                                    ) : (
                                        <span><RiEyeLine size={20}/></span>
                                    )}
                                </span>

                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="●●●●●●●●"
                                    className="h-12"
                                    //className="w-full px-4 py-3 rounded-xl bg-transparent outline-none pl-12 placeholder:opacity-50"
                                    aria-invalid={!!errors.password}
                                />

                            </div>
                            {errors.password && <p className="mt-1 text-rose-500 text-sm">{errors.password}</p>}
                        </label>

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input type="checkbox"
                                       disabled
                                       className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"/>
                                <span className="text-slate-300 dark:text-slate-300">مرا به خاطر بسپار</span>
                            </label>
                        </div>

                        <div className='text-center'>
                            <Button type='submit' size='lg' disabled={loading} className='w-full h-12'>
                                {
                                    loading ? 'در حال ورود...' : 'ورود'
                                }
                            </Button>
                            <a href='#'
                                    // onClick={() => alert('از قابلیت بازیابی رمز عبور در پروژه واقعی استفاده کنید')}
                                    className="text-xs text-indigo-100 dark:text-indigo-400">بازیابی رمز عبور
                            </a>
                        </div>
                        <p className="text-center text-xs text-slate-400">
                            سیستم یکپارچه
                            <span className="text-slate-600 dark:text-slate-300"> ماهان </span>
                        </p>
                    </form>
                </main>
            </div>
        </div>
    );
}
