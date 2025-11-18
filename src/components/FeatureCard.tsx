import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard = ({ icon: Icon, title, description, badge }: FeatureCardProps) => {
  return (
    <div className="group relative glass-effect p-6 rounded-2xl hover:border-primary/50 transition-all hover:scale-105 hover:border-glow-cyan">
      {badge && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-secondary to-accent text-foreground text-xs font-bold px-3 py-1 rounded-full border-glow-magenta">
          {badge}
        </div>
      )}
      
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:border-glow-cyan border border-primary/30">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
