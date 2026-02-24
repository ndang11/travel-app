import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Icons from './Icons';

const BookingSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  checkin: Yup.date().required('Check-in date is required'),
  checkout: Yup.date().min(Yup.ref('checkin'), 'Checkout must be after checkin').required('Required'),
  guests: Yup.number().min(1, 'At least 1 guest').required('Required'),
});

export default function BookingForm({ onSubmit }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
        <h4 className="font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center">
            <Icons.buildingHotel />
          </span>
          Book Your Stay
        </h4>
        <p className="text-white/80 text-sm">Complete the form below to reserve</p>
      </div>

      <div className="p-5">
        <Formik
          initialValues={{ 
            name: '', 
            email: '', 
            phone: '',
            checkin: '', 
            checkout: '',
            guests: 1,
            roomType: 'standard'
          }}
          validationSchema={BookingSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onSubmit(values);
            setTimeout(() => {
              setSubmitting(false);
              resetForm();
            }, 1000);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Icons.user />
                  </div>
                  <Field 
                    name="name" 
                    placeholder="John Doe" 
                    className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                  />
                </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Icons.envelope />
                    </div>
                    <Field 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Icons.phone />
                    </div>
                    <Field 
                      name="phone" 
                      type="tel" 
                      placeholder="+1 234 567 8900" 
                      className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    />
                  </div>
                </div>
              </div>

              {/* Check-in & Check-out */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Check-in *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Icons.calendar />
                    </div>
                    <Field 
                      name="checkin" 
                      type="date" 
                      className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    />
                  </div>
                  <ErrorMessage name="checkin" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Check-out *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Icons.calendar />
                    </div>
                    <Field 
                      name="checkout" 
                      type="date" 
                      className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    />
                  </div>
                  <ErrorMessage name="checkout" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              {/* Guests & Room Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Guests *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Icons.users />
                    </div>
                    <Field 
                      name="guests" 
                      type="number" 
                      min="1"
                      className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    />
                  </div>
                  <ErrorMessage name="guests" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Room Type
                  </label>
                  <select
                    value={values.roomType}
                    onChange={(e) => setFieldValue('roomType', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="w-5 h-5 flex items-center justify-center">
                      <Icons.calendar />
                    </span>
                    Book Now
                  </>
                )}
              </button>

              {/* Trust Note */}
              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                <span className="w-4 h-4 flex items-center justify-center">
                  <Icons.shieldCheck />
                </span>
                Secure booking - Free cancellation up to 24h before check-in
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
