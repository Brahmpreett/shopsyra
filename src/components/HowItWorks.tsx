import { MessageSquare, MapPin, Sparkles, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Ask",
    description: "Chat with AI or use voice to find products",
  },
  {
    icon: MapPin,
    title: "Locate",
    description: "Get exact aisle, floor, and shelf location",
  },
  {
    icon: Sparkles,
    title: "Optimize",
    description: "AI creates shortest route with personalized deals",
  },
  {
    icon: ShoppingCart,
    title: "Shop Faster",
    description: "Navigate store efficiently and save time",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to revolutionize your shopping experience
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="glass-effect p-6 rounded-2xl text-center hover:border-primary/50 transition-all hover:scale-105 hover:border-glow-cyan">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-glow-cyan">
                    <step.icon className="w-8 h-8 text-background" />
                  </div>
                  <div className="w-8 h-8 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
