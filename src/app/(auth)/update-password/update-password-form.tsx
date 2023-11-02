"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Alert from "@/components/ui/alerts";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import schema, { type ResetPasswordSchema } from "./schema";

import userActions from "@/actions/users";

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [success, setSucess] = useState<any>();

  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ResetPasswordSchema>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async ({ password }: ResetPasswordSchema) => {
    // start loading state
    setLoading(true);

    try {
      const data = await userActions.updatePassword(password);

      // successfully sign up data
      setSucess(data);
      // reset the form
      reset();

      router.replace("/login");
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
          size="medium"
          message={"Password updated"}
          onClose={() => setSucess(null)}
        />
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="password"
          label="New Password"
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
          Submit
        </Button>
      </form>
    </>
  );
}
