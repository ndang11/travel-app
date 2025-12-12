import React from 'react'
import DestinationCard from '../components/DestinationCard'
import AttractionsList from '../components/AttractionsList'

const sample = [
  { id: 'paris', code: 'paris', name: 'Paris, France', summary: 'City of lights', image: 'https://source.unsplash.com/800x600/?paris' },
  { id: 'tokyo', code: 'tokyo', name: 'Tokyo, Japan', summary: 'Modern & historic', image: 'https://source.unsplash.com/800x600/?tokyo' },
]

export default function Home(){
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sample.map(s => <DestinationCard key={s.id} destination={s} />)}
        </div>
        <AttractionsList />
      </section>
    </div>
  )
}