import { useState } from "react";
import { Link } from "react-router-dom";

const CONTACTS = [
  { icon: "📧", title: "Email", value: "royaltyhopsin@gmail.com", desc: "We'll respond within 24 hours" },
  { icon: "📞", title: "Phone", value: "+237 676062793", desc: "Mon-Fri, 9AM-6PM EST" },
  { icon: "📍", title: "Headquarters", value: "Cameroon, Africa", desc: "Global team, anywhere access" },
];

const FAQ = [
  { q: "How do I book a trip?", a: "Simply select your destination, choose dates, and complete our easy booking form." },
  { q: "Is my payment secure?", a: "Yes! We use industry-standard encryption to keep your payment information safe." },
  { q: "Can I cancel my booking?", a: "Yes, most bookings can be cancelled up to 48 hours before check-in for a full refund." },
  { q: "Do you offer group discounts?", a: "Contact us directly for group bookings of 10+ travelers for special rates." },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-rose-500/20 text-rose-400 font-semibold rounded-full text-sm mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            We'd Love to <span className="text-rose-400">Hear From You</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions? Our team is here to help you plan your perfect adventure.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-16">
        <div className="grid md:grid-cols-3 gap-6">
          {CONTACTS.map((contact, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow">
              <span className="text-4xl block mb-4">{contact.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
              <p className="text-rose-500 font-semibold mb-1">{contact.value}</p>
              <p className="text-gray-500 text-sm">{contact.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💬</span> Send us a Message
            </h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">❓</span> Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {FAQ.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="p-6 cursor-pointer flex items-center justify-between font-semibold text-gray-900">
                      {item.q}
                      <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      {item.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="text-white/90 mb-4">Check our help center or browse popular destinations</p>
              <div className="flex flex-col gap-3">
                <Link to="/discovery" className="px-4 py-2 bg-white/20 rounded-lg text-center hover:bg-white/30 transition">
                  Browse Destinations
                </Link>
                <Link to="/booking" className="px-4 py-2 bg-white/20 rounded-lg text-center hover:bg-white/30 transition">
                  Make a Booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl block mb-4">🌍</span>
                <p className="text-gray-600 font-medium">Global Support, Everywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}