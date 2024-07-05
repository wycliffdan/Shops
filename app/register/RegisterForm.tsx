'use client'

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from 'react-icons/ai';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Input from "../components/inputs/input";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: '',
      password: "",
    }
  });

  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/cart")
      router.refresh();
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
     .then(() => {
        toast.success("Account created");

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })
         .then((callback) => {
            if (callback?.ok) {
              router.push('/cart');
              toast.success('Logged In');
            }

            if (callback?.error) {
              toast.error(callback.error);
            }
          })
         .catch(() => {
            toast.error("Failed to sign in after registration.");
          })
         .finally(() => {
            setIsLoading(false);
          });
      })
     .catch(() => {
        toast.error("Failed to register account.");
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className="text-center">Logged in Redirecting...</p>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Heading title="Sign up for Shop" />
      <Button 
        outline 
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px my-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
        <Input 
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
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
        <Button 
          label={isLoading? "Loading" : "Sign Up"}
        //   loading={isLoading}
        onClick={handleSubmit(onSubmit)}  
        />
      </form>
      <p className="text-sm mt-4">
        Already have an account? 
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;