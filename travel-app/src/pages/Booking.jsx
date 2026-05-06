import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import bookingValidation from "../validations/bookingValidation";

// Booking type options
const bookingTypes = [
  { id: "hotel", icon: "🏨", label: "Hotel" },
  { id: "flight", icon: "✈️", label: "Flight" },
  { id: "tour", icon: "🎯", label: "Tour" },
  { id: "package", icon: "📦", label: "Package" },
];

export default function Booking() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            Hotel & Tour Booking
          </h1>
          <p className="text-slate-600 text-lg">
            Fill in the details below to book your perfect trip
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  phone: "",
                  travelDate: "",
                  returnDate: "",
                  people: "",
                  bookingType: "hotel",
                  specialRequests: "",
                }}
                validationSchema={bookingValidation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log("BOOKING DATA:", values);
                  setTimeout(() => {
                    alert("Your booking has been submitted!");
                    setSubmitting(false);
                    resetForm();
                  }, 1000);
                }}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="space-y-6">
                    {/* Booking Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Booking Type
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {bookingTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFieldValue("bookingType", type.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                              values.bookingType === type.id
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 hover:border-slate-300 bg-slate-50"
                            }`}
                          >
                            <span className="text-2xl">{type.icon}</span>
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <Field
                          name="fullName"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    </div>

                    {/* Date Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Travel Date *
                        </label>
                        <Field
                          type="date"
                          name="travelDate"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="travelDate"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Return Date
                        </label>
                        <Field
                          type="date"
                          name="returnDate"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {/* People */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Number of People *
                      </label>
                      <Field
                        type="number"
                        name="people"
                        min="1"
                        placeholder="2"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                      <ErrorMessage
                        name="people"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Special Requests
                      </label>
                      <Field
                        as="textarea"
                        name="specialRequests"
                        rows="3"
                        placeholder="Any special requirements or preferences..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Submit Booking"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <span>📋</span> Booking Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Type</span>
                  <span className="font-medium capitalize">Hotel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guests</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nights</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total</span>
                    <span className="font-bold text-indigo-600">TBD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>📞</span> Need Help?
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Our team is available 24/7 to assist you with your booking.
              </p>
              <div className="space-y-2">
                <a href="tel:+1234567890" className="flex items-center gap-2 text-white/90 hover:text-white">
                  <span>📱</span> +1 234 567 8900
                </a>
                <a href="mailto:support@travelapp.com" className="flex items-center gap-2 text-white/90 hover:text-white">
                  <span>✉️</span> support@travelapp.com
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <span>🛡️</span> Why Book With Us?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-sm text-slate-600">Best price guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-sm text-slate-600">Free cancellation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-sm text-slate-600">24/7 customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-sm text-slate-600">Secure payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
