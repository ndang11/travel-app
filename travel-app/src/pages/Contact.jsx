export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>

      <p className="text-gray-600">
        Have questions, suggestions, or need help planning your trip?  
        Reach out to us anytime.
      </p>

      <div className="border rounded p-6 space-y-4">
        <div>
          <p className="font-semibold">📧 Email</p>
          <p className="text-gray-600">support@travelx.com</p>
        </div>

        <div>
          <p className="font-semibold">📞 Phone</p>
          <p className="text-gray-600">+1 234 567 890</p>
        </div>

        <div>
          <p className="font-semibold">📍 Address</p>
          <p className="text-gray-600">
            123 Travel Street, Adventure City, World
          </p>
        </div>
      </div>
    </div>
  );
}
