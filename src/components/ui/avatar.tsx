import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  online?: boolean;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ src, name, size = 48, online, className }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      {src ? (
        <img
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full rounded-full object-cover"
        />
      ) : name ? (
        <div className="w-full h-full rounded-full bg-[var(--color-green-forest)] flex items-center justify-center text-[#F5F0E8] font-medium"
          style={{ fontSize: size * 0.35 }}
        >
          {getInitials(name)}
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-[var(--color-green-forest)] flex items-center justify-center">
          <User size={size * 0.5} className="text-[#F5F0E8]" />
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[var(--color-green-mid)] border-2 border-white" />
      )}
    </div>
  );
}
