
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-auto">
      <div className="text-center text-gray-600">
        &copy; {new Date().getFullYear()} Destination Travel App. All rights reserved.
      </div>
    </footer>
  );
}
