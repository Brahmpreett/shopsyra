import { Bot, MapPin, Route, ListChecks, Sparkles, Store } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Bot,
    title: "AI Chatbot (Google Gemini)",
    description: "Ask 'Is this product available?', 'Which aisle?', 'Where is it located?' Get instant answers with text & voice support, powered by real-time store data.",
    badge: "AI-Powered",
  },
  {
    icon: MapPin,
    title: "Real-Time Product Availability",
    description: "Check inventory BEFORE you visit. See available/out of stock status, last updated time, and get alternative suggestions when needed.",
    badge: "Live Data",
  },
  {
    icon: Route,
    title: "Smart Map + Shortest Path Algorithm",
    description: "Like Google Maps for inside supermarkets. Indoor store map calculates the fastest route to complete your shopping list. Updates dynamically as you add/remove items.",
    badge: "Core MVP",
  },
  {
    icon: ListChecks,
    title: "Shopping List Optimizer",
    description: "Enter your list and AI arranges items in perfect order. Minimizes walking distance, shows ETA, and integrates personalized deals & recommendations.",
  },
  {
    icon: Sparkles,
    title: "AI Deal Suggestions",
    description: "Personalized recommendations based on what you're buying. Real-time store promotions and smart suggestions to maximize savings.",
  },
  {
    icon: Store,
    title: "Retailer Integration (B2B)",
    description: "API for seamless inventory syncing, analytics dashboard with insights, store movement heatmaps, and flexible monthly SaaS pricing.",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Core MVP Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary AI-powered shopping experience that transforms how you navigate stores
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
