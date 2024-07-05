'use client';

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
// import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
import Input from "../components/inputs/input";

interface LoginFormProps {
    currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/cart");
        }
    }, [currentUser, router]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        });

        setIsLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else if (result?.ok) {
            router.push('/cart');
            toast.success('Logged In');
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const result = await signIn('google', {
            redirect: false,
        });

        setIsLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else if (result?.ok) {
            router.push('/cart');
            toast.success('Logged In with Google');
        }
    };

    if (currentUser) {
        return <p className="text-center">Logged in Redirecting...</p>;
    }

    return (
        <>
            <Heading title="Sign in for Shop" />
            <Button
                outline
                label="Sign in with Google"
                icon={AiOutlineGoogle}
                onClick={handleGoogleSignIn}
                disabled={isLoading}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="email"
                    label="Email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Button label = {isLoading ? "Loading" : "Login"}
       onClick={handleSubmit(onSubmit)}  
       />
            </form>
            <p className="text-sm">
                Do not have an account?{" "}
                <Link href="/register" legacyBehavior>
                    <a className="underline">Sign Up</a>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
