import * as Yup from "yup";

export interface LoginSchma {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Enter your email address"),
  password: Yup.string().label("Password").required("Enter your password"),
});

export default schema;
