import { Zap } from "lucide-react";

const AnnouncementTicker = () => {
  const announcements = [
    "🔥 Big Discount Sale",
    "⚡ Early Access Available",
    "💎 70% Cashback Guarantee",
    "🚀 AI-Powered Shopping",
    "🎯 Limited Time Offer",
  ];

  return (
    <div className="w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-y border-primary/30 overflow-hidden">
      <div className="flex animate-slide-left">
        {[...announcements, ...announcements, ...announcements].map((text, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-8 py-3 whitespace-nowrap"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementTicker;
