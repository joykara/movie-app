'use client'
import CommonButton from '@/common/shared/button';
import { showToast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email') as string;
        const password = form.get('password') as string;
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            showToast('error', `${error.message}`);
            setLoading(false)
        } else {
            showToast('success', 'Login successful!');
            setLoading(false)
            router.push('/dashboard');
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-violet/[.5] h-auto md:w-1/2 lg:w-1/3 m-auto md:p-14 lg:p-16 text-center z-10 bg-white-opacity rounded-md 2xl:p-20"
            action="javascript:void(0);"
        >
            <div>
                <p className="font-bold text-2xl md:text-xl lg:text-3xl mt-1 mb-4">Welcome Back</p>
            </div>

            <div className="relative flex flex-col w-full mt-6 gap-4 md:w-full lg:w-full 2xl:w-full">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 rounded-md bg-white dark:bg-eerie border border-black text-sm text-eerie dark:text-smoke"
                    required
                />
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-md bg-white dark:bg-eerie border border-black text-sm text-eerie dark:text-smoke"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-smoke"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            <div className="flex justify-between md:text-base xsm:text-sm items-center gap-2 xsm:gap-6 my-4">
                <div className="">
                    <Link
                        href="/sign-up"
                        data-link="signup_redirect"
                        className="text-sm text-black dark:text-white hover:text-green dark:hover:text-amber transition-colors cursor-pointer"
                    >
                        Create Account
                    </Link>
                </div>
                <div className="">
                    <Link
                        href="/forgot-password"
                        data-link="forgot_redirect"
                        className="text-sm text-black dark:text-white hover:text-green dark:hover:text-amber transition-colors cursor-pointer"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>
            <CommonButton
                type="submit"
                title="Login"
                bg="bg-white hover:bg-violet"
                border="border border-violet"
                loading={loading}
            />

        </form>
    );
}
