import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import WorkList from "@/components/WorkList";
import Stats from "@/components/Stats";
import PodiumStrip from "@/components/PodiumStrip";
import Practice from "@/components/Practice";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <WorkList />
      <Stats />
      <PodiumStrip />
      <Practice />
    </>
  );
}
