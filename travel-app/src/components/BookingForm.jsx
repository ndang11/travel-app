import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  checkin: Yup.date().required('Required'),
  checkout: Yup.date().min(Yup.ref('checkin'), 'Checkout must be after checkin').required('Required'),
})

export default function BookingForm({ onSubmit }){
  return (
    <div className="border p-4 rounded">
      <h4 className="font-semibold mb-2">Book a tour / hotel</h4>
      <Formik
        initialValues={{ name: '', email: '', checkin: '', checkout: '' }}
        validationSchema={BookingSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values)
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            <div>
              <Field name="name" placeholder="Full name" className="w-full border rounded px-3 py-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Field name="checkin" type="date" className="w-full border rounded px-3 py-2" />
                <ErrorMessage name="checkin" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field name="checkout" type="date" className="w-full border rounded px-3 py-2" />
                <ErrorMessage name="checkout" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">Book</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}