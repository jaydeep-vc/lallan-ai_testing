import * as Yup from "yup";

export interface ForgetPasswordSchema {
  email: string;
}

const schema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Enter your email address"),
});

export default schema;
