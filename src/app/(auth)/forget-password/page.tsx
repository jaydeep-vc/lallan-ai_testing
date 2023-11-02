import type { Metadata } from "next";

import AuthLayoutContainer from "../auth-layout-container";
import ForgetPasswordForm from "./forget-password-form";

import { fuseTitleText } from "@/lib/toolbar";

export const metadata: Metadata = {
  title: fuseTitleText("Lallan.AI", "Forget password"),
  description: "Forget your password",
  authors: { name: "Vittor Cloud", url: "https://viitorcloud.com/" },
};

export default function ForgetPassword() {
  return (
    <AuthLayoutContainer
      heading="Forget Password"
      headingLabel="Enter your email address to get a link for updating your password"
      formContainerClassName="mt-10 sm:mx-auto sm:w-full sm:max-w-lg"
    >
      <ForgetPasswordForm />
    </AuthLayoutContainer>
  );
}
