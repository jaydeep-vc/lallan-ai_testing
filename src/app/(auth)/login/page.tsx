import type { Metadata } from "next";

import AuthLayoutContainer from "../auth-layout-container";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Lallan.AI | Login",
  description: "Login to Lallan.AI account",
  authors: { name: "Vittor Cloud", url: "https://viitorcloud.com/" },
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function LoginPage({ searchParams }: Props) {
  return (
    <AuthLayoutContainer
      heading="Welcome to Lallan.AI!"
      headingLabel="Welcome to AI"
      formContainerClassName="mt-10 sm:mx-auto sm:w-full sm:max-w-lg"
    >
      <LoginForm
        {...(searchParams.error &&
          searchParams.error === "true" && {
            serverError: "Your session is invalid. Please try again",
          })}
      />
    </AuthLayoutContainer>
  );
}
