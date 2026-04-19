import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DestinationPage from "./pages/DestinationPage";
import SearchResult from "./pages/SearchResult";
import DiscoveryPage from "./pages/DiscoveryPage";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import BookingForm from "./components/BookingForm";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Navbar />

      <main className="max-w-[1370px] mx-auto px-5 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/discovery" element={<DiscoveryPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/destination/:code/:city?" element={<DestinationPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
