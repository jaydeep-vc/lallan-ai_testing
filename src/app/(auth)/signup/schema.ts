import * as Yup from "yup";

export interface AccountSchema {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string | undefined;
}

const schema = Yup.object({
  first_name: Yup.string().label("First name").required("Enter your first name"),
  last_name: Yup.string().label("Last name").required("Enter your last name"),
  email: Yup.string().email("Enter valid email").required("Enter your email address"),
  password: Yup.string()
    .label("Password")
    .min(6, "Your password should be minium 6 character long")
    .required("Enter password"),
  confirm_password: Yup.string().oneOf([Yup.ref("password")], "Password must be match"),
});

export default schema;
