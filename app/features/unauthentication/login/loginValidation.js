import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
  email: Yup.string().email("Invalid email").required("Required"),
});
