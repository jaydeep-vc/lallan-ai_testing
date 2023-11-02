import type { Metadata } from "next";

import AuthLayoutContainer from "../auth-layout-container";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Lallan.AI | Signup | Create Your Account",
  description: "Create your account with Lallan.AI to continue researching.",
  authors: { name: "Vittor Cloud", url: "https://viitorcloud.com/" },
};

export default function SignupPage() {
  return (
    <AuthLayoutContainer heading="Create your account">
      <SignupForm />
    </AuthLayoutContainer>
  );
}
