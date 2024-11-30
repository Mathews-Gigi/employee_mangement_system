import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 letters required"),
});
