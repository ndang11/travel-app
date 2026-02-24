// Hotel search service - returns mock hotel data
export async function searchHotels(city) {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock hotel data
  const hotels = [
    {
      name: "Grand Palace Hotel",
      price: 120,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      amenities: ["WiFi", "Pool", "Spa"],
    },
    {
      name: "City View Inn",
      price: 80,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7?w=400",
      amenities: ["WiFi", "Breakfast"],
    },
    {
      name: "Seaside Resort",
      price: 200,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
      amenities: ["WiFi", "Pool", "Beach", "Restaurant"],
    },
    {
      name: "Mountain Lodge",
      price: 95,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400",
      amenities: ["WiFi", "Parking", "Hiking"],
    },
    {
      name: "Urban Boutique Hotel",
      price: 150,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      amenities: ["WiFi", "Gym", "Bar"],
    },
    {
      name: "Cozy Stay Hotel",
      price: 65,
      rating: 3.9,
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
      amenities: ["WiFi", "Parking"],
    },
  ];
  
  return hotels;
}

// Legacy function for compatibility
export async function getHotels(cityCode) {
  return searchHotels(cityCode);
}
