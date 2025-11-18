import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    title: "Your AI Shopping Companion",
    subtitle: "Powered by Google Gemini for instant, intelligent answers",
  },
  {
    image: hero2,
    title: "Smart Map + Shortest Path",
    subtitle: "Navigate stores with the fastest route to complete your list",
  },
  {
    image: hero3,
    title: "Find Any Product Instantly",
    subtitle: "Real-time availability, location, and personalized deals",
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          </div>

          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-glow-cyan bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Shopsyra
                </span>
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-foreground font-semibold text-lg px-8 py-6 border-glow-cyan hover:scale-105 transition-transform"
              >
                Try Prototype
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass-effect hover:border-glow-cyan transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass-effect hover:border-glow-cyan transition-all"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current
                ? "bg-primary w-8 border-glow-cyan"
                : "bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
