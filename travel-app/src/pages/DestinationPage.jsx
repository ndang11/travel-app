import React from 'react'
import { useParams } from 'react-router-dom'
import WeatherWidget from '../components/WeatherWidget'
import AttractionsList from '../components/AttractionsList'
import CurrencyRates from '../components/CurrencyRates'
import LanguageInfo from '../components/LanguageInfo'
import HotelsList from '../components/HotelsList'
import BookingForm from '../components/BookingForm'

export default function DestinationPage(){
  const { countryCode } = useParams()
  const country = { name: countryCode, languages: ['Local language', 'English'] }

  const handleBooking = (values) => {

    alert('Booking submitted: ' + JSON.stringify(values))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <WeatherWidget place={country.name} />
        <AttractionsList place={country.name} />
        <HotelsList city={country.name} />
      </div>
      <aside className="space-y-4">
        <CurrencyRates base={'USD'} />
        <LanguageInfo country={country} />
        <BookingForm onSubmit={handleBooking} />
      </aside>
    </div>
  )
}