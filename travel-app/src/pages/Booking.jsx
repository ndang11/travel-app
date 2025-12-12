import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import bookingValidation from "../validations/bookingValidation";


export default function Booking() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Hotel & Tour Booking</h1>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          travelDate: "",
          people: "",
        }}
        validationSchema={bookingValidation}
        onSubmit={(values) => {
          console.log("BOOKING DATA:", values);
          alert("Your booking has been submitted!");
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label>Full Name</label>
              <Field name="fullName" className="input" />
              <ErrorMessage name="fullName" className="error" component="div" />
            </div>

            <div>
              <label>Email</label>
              <Field name="email" className="input" />
              <ErrorMessage name="email" className="error" component="div" />
            </div>

            <div>
              <label>Travel Date</label>
              <Field type="date" name="travelDate" className="input" />
              <ErrorMessage name="travelDate" className="error" component="div" />
            </div>

            <div>
              <label>Number of People</label>
              <Field type="number" name="people" className="input" />
              <ErrorMessage name="people" className="error" component="div" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg w-full"
            >
              Submit Booking
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
