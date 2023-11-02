"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Alert from "@/components/ui/alerts";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import { parserParameters, parserQueryParameters } from "@/lib/url-parser";

import schema, { type ForgetPasswordSchema } from "./schema";
import userActions from "@/actions/users";

export default function ForgetPasswordForm() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ForgetPasswordSchema>({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);
  const [success, setSucess] = useState<any>();

  const onSubmit = async ({ email }: ForgetPasswordSchema) => {
    setLoading(true);

    try {
      const url = parserParameters(process.env.NEXT_PUBLIC_APP_URL!, "auth", "callback");
      const redirectTo = parserQueryParameters(url, { next: "/update-password" });
      await userActions.resetPassword(email, { redirectTo });
      // successfully sent reset password
      setSucess({});
    } catch (err) {
      console.error(err);
      setError(err);
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
          message="Check your email to update new password"
          onClose={() => setSucess(null)}
        />
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email Address"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <Button className="w-full" loading={loading} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
    </>
  );
}
