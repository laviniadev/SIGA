import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <span className={cn("font-black tracking-tighter uppercase font-inter", className)}>
      <span className="text-primary">SIGA</span>
      <span className="text-secondary">Store</span>
    </span>
  );
};
