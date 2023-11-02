"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Alert from "@/components/ui/alerts";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import useToast from "@/hooks/use-toast";

import schema, { type AccountSchema } from "./schema";
import userActions from "@/actions/users";

export default function SignupForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [success, setSucess] = useState<any>();

  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AccountSchema>({ resolver: yupResolver(schema) });

  const router = useRouter();
  const { setToastAlert } = useToast();

  const onSubmit = async (account: AccountSchema) => {
    // start loading state
    setLoading(true);

    try {
      // remove the password and confirm_password before inserting data into database
      const { password, confirm_password, ...profile } = Object.assign({}, account);
      const emailRedirectTo =
        process.env.NEXT_PUBLIC_APP_URL! + process.env.NEXT_PUBLIC_SIGNUP_EMAIL_REDIRECT_TO!;
      const data = await userActions.singUp(account.email, account.password, {
        emailRedirectTo,
        data: { ...profile },
      });
      // successfully sign up data
      setSucess(data);
      // reset the form
      reset();
      // redirect to the login page
      router.push("/login");
      setToastAlert({
        title: "Sign up successfully",
        message: "Check your mail to confirm the login process.",
        type: "success",
      });
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          intent="error"
          size="medium"
          message={error?.message || "Something went wrong"}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <Alert
          intent="success"
          message="Your account have been created. Just open the link that we have shared with you on your email"
          onClose={() => setSucess(null)}
        />
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <Input
            id="first_name"
            label="First Name"
            name="first_name"
            register={register}
            error={errors.first_name?.message}
          />

          <Input
            id="last_name"
            label="Last Name"
            name="last_name"
            register={register}
            error={errors.last_name?.message}
          />
        </div>

        <Input
          id="email"
          label="Email Address"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <Input
          id="confirm_password"
          label="Confirm Password"
          type="password"
          name="confirm_password"
          register={register}
          error={errors.confirm_password?.message}
        />

        <Button className="w-full" loading={loading} onClick={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have one ?{" "}
        <Link
          href="/login"
          className="font-semibold leading-6 ms-1 text-primary hover:text-primary-800"
          prefetch={true}
        >
          Login
        </Link>
      </p>
    </>
  );
}
