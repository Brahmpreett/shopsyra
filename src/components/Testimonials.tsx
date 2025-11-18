import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Busy Mom",
    content: "Shopsyra cut my shopping time in half! The AI chatbot instantly finds everything, and the shortest path feature is genius.",
    rating: 5,
  },
  {
    name: "Mark Chen",
    role: "Tech Professional",
    content: "Finally, Google Maps for supermarkets! The real-time inventory check saves me from wasted trips. Game changer.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    content: "The deal suggestions are spot-on. Saved 30% on my grocery bill last month while shopping faster than ever.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Shoppers Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real experiences from early access users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-effect p-6 rounded-2xl hover:border-secondary/50 transition-all hover:scale-105 hover:border-glow-magenta animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
