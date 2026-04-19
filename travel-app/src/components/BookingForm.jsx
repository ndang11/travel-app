import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookingSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Too short').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().min(10, 'Invalid phone number').required('Phone is required'),
  destination: Yup.string().required('Please select a destination'),
  checkIn: Yup.date().required('Check-in date is required'),
  checkOut: Yup.date().min(Yup.ref('checkIn'), 'Check-out must be after check-in').required('Check-out date is required'),
  guests: Yup.number().min(1, 'At least 1 guest').required('Number of guests is required'),
  roomType: Yup.string().required('Please select a room type'),
});

const DESTINATIONS = [
  { code: 'FR', name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
  { code: 'JP', name: 'Japan', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop' },
  { code: 'IT', name: 'Italy', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop' },
  { code: 'US', name: 'United States', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
  { code: 'ES', name: 'Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop' },
  { code: 'TH', name: 'Thailand', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop' },
];

const ROOM_TYPES = [
  { id: 'standard', name: 'Standard Room', price: 99, icon: '🛏️', desc: 'Comfortable room with basic amenities' },
  { id: 'deluxe', name: 'Deluxe Room', price: 149, icon: '✨', desc: 'Spacious room with city view' },
  { id: 'suite', name: 'Executive Suite', price: 249, icon: '🏠', desc: 'Luxury suite with living area' },
  { id: 'family', name: 'Family Room', price: 199, icon: '👨‍👩‍👧', desc: 'Large room for the whole family' },
];

export default function BookingForm() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [step, setStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log('Booking submitted:', values);
      setSubmitting(false);
      setBookingSuccess(true);
      resetForm();
    }, 1000);
  };

  const calculateTotal = (values) => {
    const checkIn = new Date(values.checkIn);
    const checkOut = new Date(values.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 0;
    const room = ROOM_TYPES.find(r => r.id === values.roomType) || ROOM_TYPES[0];
    return nights * room.price;
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your booking has been successfully submitted. We'll send a confirmation email shortly.</p>
          <div className="flex flex-col gap-3">
            <Link to="/" className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition">
              Back to Home
            </Link>
            <button onClick={() => setBookingSuccess(false)} className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition">
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Book Your <span className="text-rose-400">Adventure</span>
          </h1>
          <p className="text-white/70 text-lg">Choose your destination and create unforgettable memories</p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-rose-500 text-white' : 'bg-white/20 text-white/50'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 ${step > s ? 'bg-rose-500' : 'bg-white/20'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  {step === 1 ? 'Select Your Destination' : step === 2 ? 'Guest Details' : 'Review & Confirm'}
                </h2>
              </div>

              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  phone: '',
                  destination: '',
                  checkIn: '',
                  checkOut: '',
                  guests: 1,
                  roomType: 'standard',
                  specialRequests: ''
                }}
                validationSchema={BookingSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                  <Form className="p-6 md:p-8 space-y-6">
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Destination</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {DESTINATIONS.map((dest) => (
                              <div
                                key={dest.code}
                                onClick={() => {
                                  setFieldValue('destination', dest.name);
                                  setSelectedDestination(dest);
                                }}
                                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
                                  values.destination === dest.name
                                    ? 'ring-4 ring-rose-500 shadow-xl transform scale-105'
                                    : 'hover:shadow-lg hover:scale-102'
                                }`}
                              >
                                <img
                                  src={dest.image}
                                  alt={dest.name}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2">
                                  <span className="text-white font-bold">{dest.name}</span>
                                </div>
                                {values.destination === dest.name && (
                                  <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <ErrorMessage name="destination" component="div" className="text-red-500 text-sm mt-2" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in Date</label>
                            <Field
                              type="date"
                              name="checkIn"
                              className={`w-full px-4 py-3 rounded-xl border-2 ${
                                errors.checkIn && touched.checkIn ? 'border-red-500' : 'border-gray-200 focus:border-rose-500'
                              } outline-none transition-colors`}
                            />
                            <ErrorMessage name="checkIn" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out Date</label>
                            <Field
                              type="date"
                              name="checkOut"
                              className={`w-full px-4 py-3 rounded-xl border-2 ${
                                errors.checkOut && touched.checkOut ? 'border-red-500' : 'border-gray-200 focus:border-rose-500'
                              } outline-none transition-colors`}
                            />
                            <ErrorMessage name="checkOut" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                          <Field
                            as="select"
                            name="guests"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none"
                          >
                            {[1,2,3,4,5,6].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                          </Field>
                        </div>

                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!values.destination || !values.checkIn || !values.checkOut}
                          className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue to Guest Details →
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <Field
                              type="text"
                              name="fullName"
                              placeholder="John Doe"
                              className={`w-full px-4 py-3 rounded-xl border-2 ${
                                errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-200 focus:border-rose-500'
                              } outline-none transition-colors`}
                            />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <Field
                              type="email"
                              name="email"
                              placeholder="john@example.com"
                              className={`w-full px-4 py-3 rounded-xl border-2 ${
                                errors.email && touched.email ? 'border-red-500' : 'border-gray-200 focus:border-rose-500'
                              } outline-none transition-colors`}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                          <Field
                            type="tel"
                            name="phone"
                            placeholder="+1 234 567 8900"
                            className={`w-full px-4 py-3 rounded-xl border-2 ${
                              errors.phone && touched.phone ? 'border-red-500' : 'border-gray-200 focus:border-rose-500'
                            } outline-none transition-colors`}
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Room Type</label>
                          <div className="grid grid-cols-2 gap-4">
                            {ROOM_TYPES.map((room) => (
                              <div
                                key={room.id}
                                onClick={() => setFieldValue('roomType', room.id)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  values.roomType === room.id
                                    ? 'border-rose-500 bg-rose-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">{room.icon}</span>
                                  <span className="font-bold text-gray-900">{room.name}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{room.desc}</p>
                                <span className="text-rose-500 font-bold">${room.price}/night</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (Optional)</label>
                          <Field
                            as="textarea"
                            name="specialRequests"
                            rows="3"
                            placeholder="Any special requirements or preferences..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none resize-none"
                          />
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {isSubmitting ? 'Processing...' : 'Review Booking →'}
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-4">Booking Summary</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Destination</span>
                              <span className="font-semibold text-gray-900">{values.destination}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Check-in</span>
                              <span className="font-semibold text-gray-900">{values.checkIn}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Check-out</span>
                              <span className="font-semibold text-gray-900">{values.checkOut}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Guests</span>
                              <span className="font-semibold text-gray-900">{values.guests}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Room Type</span>
                              <span className="font-semibold text-gray-900">{ROOM_TYPES.find(r => r.id === values.roomType)?.name}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between">
                              <span className="font-bold text-gray-900">Total</span>
                              <span className="font-bold text-rose-500 text-xl">${calculateTotal(values)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                          >
                            ← Edit
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {isSubmitting ? 'Confirming...' : 'Confirm Booking ✅'}
                          </button>
                        </div>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Why Book With Us?</h3>
              <div className="space-y-4">
                {[
                  { icon: '🔒', title: 'Secure Booking', desc: 'Your data is protected' },
                  { icon: '💰', title: 'Best Price Guarantee', desc: 'We match any price' },
                  { icon: '🎯', title: '24/7 Support', desc: 'We\'re here to help' },
                  { icon: '⭐', title: '5-Star Reviews', desc: 'Loved by travelers' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-amber-500 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-white/90 text-sm mb-4">Our team is available 24/7 to assist you with your booking.</p>
              <button className="w-full py-3 bg-white text-rose-500 font-bold rounded-xl hover:bg-white/90 transition">
                Contact Us
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Popular This Month</h3>
              <div className="space-y-3">
                {DESTINATIONS.slice(0, 3).map((dest) => (
                  <div key={dest.code} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-lg object-cover" />
                    <span className="font-semibold text-gray-900">{dest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}