import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import SelectedWork from "@/components/SelectedWork";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <HeroSection />
      <IntroSection />
      <SelectedWork />
      <Footer />
    </main>
  );
}
