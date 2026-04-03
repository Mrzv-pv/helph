"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import {
  LayoutDashboard, ShoppingBag, MessageCircle, Briefcase, User, Settings, Bell,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: "/dashboard", label: t("dash.overview"), icon: LayoutDashboard },
    { href: "/dashboard/orders", label: t("dash.orders"), icon: ShoppingBag },
    { href: "/dashboard/messages", label: t("dash.messages"), icon: MessageCircle },
    { href: "/dashboard/services", label: t("dash.services"), icon: Briefcase },
    { href: "/dashboard/profile", label: t("dash.profile"), icon: User },
    { href: "/dashboard/settings", label: t("dash.settings"), icon: Settings },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] bg-[var(--color-green-dark)] shrink-0">
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 text-sm transition-colors relative",
                  isActive
                    ? "bg-[var(--color-green-forest)] text-[#F5F0E8]"
                    : "text-[var(--color-sage)] hover:text-[#F5F0E8] hover:bg-[var(--color-green-forest)]/50",
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)] rounded-r" />
                )}
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-[60px] border-b border-[var(--color-border)] bg-white flex items-center justify-between px-6">
          <h2 className="text-[15px] font-medium">
            {t("dash.hello")}, <span className="text-[var(--color-gold)]">{"\u0410\u043D\u043D\u0430"}</span> 👋
          </h2>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-[var(--color-champagne)] transition-colors">
              <Bell size={20} className="text-[var(--color-text-muted)]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-error)]" />
            </button>
            <Avatar name="Анна Петрова" size={36} online />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] flex z-50">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center py-2 text-[10px]",
                isActive ? "text-[var(--color-gold)]" : "text-[var(--color-text-muted)]",
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
