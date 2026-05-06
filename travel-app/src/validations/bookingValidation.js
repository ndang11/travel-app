import * as Yup from "yup";

const bookingValidation = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  travelDate: Yup.date().required("Travel date required"),
  people: Yup.number().min(1, "At least 1 person").required("Number required"),
});

export default bookingValidation;
