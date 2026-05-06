import { Link } from "react-router-dom";

const TEAM = [
  { name: "Sarah Chen", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/women/44.jpg", desc: "Travel enthusiast with 10+ years in tech" },
  { name: "Michael Torres", role: "CTO", image: "https://randomuser.me/api/portraits/men/32.jpg", desc: "Full-stack developer & adventure seeker" },
  { name: "Emma Williams", role: "Head of Design", image: "https://randomuser.me/api/portraits/women/68.jpg", desc: "UX expert passionate about travel experiences" },
  { name: "James Park", role: "Head of Operations", image: "https://randomuser.me/api/portraits/men/75.jpg", desc: "Operations specialist with global perspective" },
];

const STATS = [
  { value: "50K+", label: "Happy Travelers" },
  { value: "200+", label: "Destinations" },
  { value: "100+", label: "Partner Hotels" },
  { value: "24/7", label: "Support" },
];

const VALUES = [
  { icon: "🎯", title: "User-First", desc: "Every feature designed with our users in mind" },
  { icon: "🌱", title: "Sustainable Travel", desc: "Promoting eco-friendly tourism practices" },
  { icon: "🤝", title: "Trust & Transparency", desc: "Honest pricing and reliable information" },
  { icon: "🚀", title: "Innovation", desc: "Constantly improving with cutting-edge technology" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-rose-500/20 text-rose-400 font-semibold rounded-full text-sm mb-6">
            About ROYAL-Tour
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Your Journey, <span className="text-rose-400">Our Mission</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We're passionate about making travel accessible, enjoyable, and stress-free for everyone.
          </p>
        </div>
      </section>

      <section className="relative -mt-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-rose-500 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-rose-500">Story</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                ROYAL-Tour was born from a simple frustration: planning a trip meant jumping between dozens of websites and apps. Weather here, hotels there, attractions somewhere else.
              </p>
              <p>
                We envisioned a single platform where travelers could find everything they need - from discovering destinations to booking stays, checking weather, finding attractions, and learning about local culture.
              </p>
              <p>
                Today, we're proud to have helped over 50,000 travelers discover their perfect adventures. And we're just getting started.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=500&fit=crop"
              alt="Travel"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-rose-500 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-white/80">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">What drives us to create the best travel experience for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
                <span className="text-4xl block mb-4">{value.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything you need for the perfect trip, all in one place</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "Discover Destinations", desc: "Explore countries and cities with detailed information, photos, and local insights" },
              { icon: "🌤️", title: "Weather Updates", desc: "Get real-time weather forecasts and 7-day outlook for your destination" },
              { icon: "🎫", title: "Top Attractions", desc: "Find must-see attractions, museums, beaches, and hidden gems" },
              { icon: "🏨", title: "Hotel Booking", desc: "Search and book accommodations that match your budget and preferences" },
              { icon: "✈️", title: "Airport Info", desc: "Access comprehensive airport information including flights and terminals" },
              { icon: "💱", title: "Currency Converter", desc: "Convert currencies and stay updated with live exchange rates" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all group">
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{feature.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The passionate people behind ROYAL-Tour</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-rose-500 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of travelers who trust ROYAL-Tour for their journeys
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/discovery"
                className="px-8 py-4 bg-white text-rose-500 font-bold rounded-full hover:shadow-lg transition-all hover:scale-105"
              >
                Explore Destinations
              </Link>
              <Link
                to="/booking"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/20 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}