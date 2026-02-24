import { Icons } from "../components/Icons";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
          <Icons.globe />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About TravelX</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your smart travel companion designed to help you explore destinations 
          with confidence. We bring everything you need for the perfect trip 
          into one seamless experience.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 px-4 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Destinations</h3>
          <p className="text-gray-600">
            Discover top cities and countries worldwide with real-time travel data, 
            local insights, and curated recommendations.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">✈️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Travel Planning</h3>
          <p className="text-gray-600">
            Find airports, check weather forecasts, explore attractions, and get 
            all the local info you need in one place.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">🧳</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
          <p className="text-gray-600">
            Book hotels and tours with a simple and intuitive interface. 
            Your next adventure is just a few clicks away.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-12 mx-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div>
            <p className="text-4xl font-bold">10K+</p>
            <p className="text-indigo-100">Destinations</p>
          </div>
          <div>
            <p className="text-4xl font-bold">50K+</p>
            <p className="text-indigo-100">Hotels</p>
          </div>
          <div>
            <p className="text-4xl font-bold">100K+</p>
            <p className="text-indigo-100">Happy Travelers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">24/7</p>
            <p className="text-indigo-100">Support</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="px-4 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Mission</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            We believe that travel should be accessible, enjoyable, and stress-free. 
            Our goal is to empower travelers with the information and tools they need 
            to plan perfect trips, from start to finish. Whether you're a seasoned 
            explorer or planning your first adventure, TravelX is here to guide you 
            every step of the way.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose TravelX?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: "🔄", title: "All-in-One Platform", desc: "Weather, attractions, hotels, and more in one place" },
            { icon: "⚡", title: "Real-Time Data", desc: "Live updates for weather, prices, and availability" },
            { icon: "🎯", title: "Personalized Recommendations", desc: "Tailored suggestions based on your preferences" },
            { icon: "💰", title: "Best Price Guarantee", desc: "Find the best deals across multiple booking sites" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
