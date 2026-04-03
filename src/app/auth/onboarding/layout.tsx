import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[640px]">
      {children}
    </div>
  );
}
