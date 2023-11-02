import * as Yup from "yup";

export interface ResetPasswordSchema {
  password: string;
  confirm_password: string | undefined;
}

const schema = Yup.object({
  password: Yup.string()
    .label("Password")
    .min(6, "Your password should be minium 6 character long")
    .required("Enter password"),
  confirm_password: Yup.string().oneOf([Yup.ref("password")], "Password must be match"),
});

export default schema;
