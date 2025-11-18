import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Newsletter = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-effect p-8 md:p-12 rounded-3xl text-center border-glow-cyan animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Get Early Access
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the waitlist for exclusive beta access and special launch offers
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background/50 border-primary/30 focus:border-primary h-12"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary text-foreground font-semibold px-8 border-glow-cyan hover:scale-105 transition-transform h-12"
            >
              Join Waitlist
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mt-4">
            🎁 First 1,000 users get lifetime 20% discount
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
