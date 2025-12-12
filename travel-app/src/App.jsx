import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import DestinationPage from "./pages/DestinationPage.jsx";
import SearchResult from "./pages/SearchResults.jsx";
import Booking from "./pages/Booking.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
