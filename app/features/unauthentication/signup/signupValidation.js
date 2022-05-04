import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signupSchema = Yup.object().shape({
  password: Yup.string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().required("Required"),
  age: Yup.string().required("Required"),

  address: Yup.string().required("Required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
