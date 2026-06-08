import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Research from "@/components/Research";
import Publications from "@/components/Publications";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Conferences from "@/components/Conferences";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Research />
      <Publications />
      <Experience />
      <Skills />
      <Conferences />
      <Contact />
      <Footer />
    </main>
  );
}
