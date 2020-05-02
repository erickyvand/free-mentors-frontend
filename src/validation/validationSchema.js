import * as yup from "yup";

export const signupShcema = yup.object({
  first_name: yup
    .string()
    .required()
    .min(3, "First Name must be at least 3 characters"),
  last_name: yup
    .string()
    .required()
    .min(3, "Last Name must be at least 3 characters"),
  email: yup.string().required().email("Email must be a valid email"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must cantain atleast 8 characters long, includes 1 uppercase, 1 special character, 1 number"
    ),
  address: yup
    .string()
    .required()
    .min(3, "Address must be at least 3 characters"),
  bio: yup.string().required().min(3, "Bio must be at least 3 characters"),
  occupation: yup
    .string()
    .required()
    .min(3, "Occupation must be at least 3 characters"),
  expertise: yup
    .string()
    .required()
    .min(3, "Expertise must be at least 3 characters"),
});

export const signinSchema = yup.object({
  email: yup.string().email('Email must be a valid email'),
});
