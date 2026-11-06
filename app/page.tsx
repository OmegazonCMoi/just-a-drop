import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import BodyParts from "@/components/body-parts";
import Artist from "@/components/artist";
import Salon from "@/components/salon";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BodyParts />
      <Artist />
      <Salon />
    </div>
  );
}
