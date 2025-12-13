import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DestinationPage from "./pages/DestinationPage";
import SearchResult from "./pages/SearchResult";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/destination/:code" element={<DestinationPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
