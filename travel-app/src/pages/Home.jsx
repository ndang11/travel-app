
import DestinationCard from "../components/DestinationCard";

const destinations = [
  {
    id: "FR",
    code: "FR",
    name: "France",
    summary: "Culture, fashion & cuisine",
    image: "https://source.unsplash.com/800x600/?france"
  },
  {
    id: "JP",
    code: "JP",
    name: "Japan",
    summary: "Tradition meets technology",
    image: "https://source.unsplash.com/800x600/?japan"
  },
  {
    id: "IT",
    code: "IT",
    name: "Italy",
    summary: "History, art & food",
    image: "https://source.unsplash.com/800x600/?italy"
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map(d => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
