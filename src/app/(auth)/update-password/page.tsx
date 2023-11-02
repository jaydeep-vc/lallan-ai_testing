import type { Metadata } from "next";

import AuthLayoutContainer from "../auth-layout-container";
import UpdatePasswordForm from "./update-password-form";

export const metadata: Metadata = {
  title: "Lallan.AI | Update Password",
  description: "Update your password now",
  authors: { name: "Vittor Cloud", url: "https://viitorcloud.com/" },
};

export default function UpdatePasswordPage() {
  return (
    <AuthLayoutContainer
      heading="Create New Password"
      headingLabel="Try to make it hard as possible your password."
      formContainerClassName="mt-10 sm:mx-auto sm:w-full sm:max-w-lg"
    >
      <UpdatePasswordForm />
    </AuthLayoutContainer>
  );
}
