import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import BodyParts from "@/components/body-parts";
import Artist from "@/components/artist";
import Salon from "@/components/salon";
import Testimonials from "@/components/testimonials";
import Gallery from "@/components/gallery";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BodyParts />
      <Artist />
      <Salon />
      <Testimonials />
      <Gallery />
    </div>
  );
}
