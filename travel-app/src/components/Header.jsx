import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold">{import.meta.env.VITE_APP_TITLE || 'Destinations'}</Link>
        <SearchBar />
        <nav>
          <Link to="/bookings" className="ml-4">Bookings</Link>
        </nav>
      </div>
    </header>
  )
}