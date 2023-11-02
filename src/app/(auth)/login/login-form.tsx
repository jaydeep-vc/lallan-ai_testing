"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Alert from "@/components/ui/alerts";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import schema, { type LoginSchma } from "./schema";
import userActions from "@/actions/users";

export default function LoginForm({ serverError }: { serverError?: string }) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginSchma>({ resolver: yupResolver(schema) });
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [serverErrorMessage, setServerErrorMessage] = useState<string | undefined>(serverError);

  const onSubmit = async ({ email, password }: LoginSchma) => {
    // start loading state
    setLoading(true);

    try {
      const user = await userActions.signIn(email, password);
      // login is success full then redirect to the / or /chats page
      router.push("/chats");
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert intent="error" message={error.message} onClose={() => setError(null)} />}
      {serverErrorMessage && (
        <Alert
          intent="error"
          message={serverErrorMessage}
          onClose={() => setServerErrorMessage(undefined)}
        />
      )}

      <form className="space-y-6">
        <Input
          id="email"
          label="Email Address"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
          />

          <Link
            href="/forget-password"
            className="text-sm absolute top-0 mt-[.20rem] text-primary hover:text-primary-800 right-0"
            prefetch={true}
          >
            Forget Password ?
          </Link>
        </div>

        <Button className="w-full" loading={loading} onClick={handleSubmit(onSubmit)}>
          Login
        </Button>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Do not have an account ?{" "}
        <Link
          href="/signup"
          className="font-semibold leading-6 ms-1 text-primary hover:text-primary-800"
          prefetch={true}
        >
          Sign Up
        </Link>
      </p>
    </>
  );
}
