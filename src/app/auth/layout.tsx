import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal header */}
      <header className="px-6 lg:px-12 py-4">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <div className="w-[36px] h-[36px] rounded-lg bg-[var(--color-gold)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D2818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-[-0.5px]" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}>
            HELP<span className="text-[var(--color-gold)]">H</span>
          </span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  );
}
