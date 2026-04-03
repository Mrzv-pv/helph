"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import { Search } from "lucide-react";

const conversations = [
  { name: "Ana Novak", lastMsg: "Dokumenti bodo pripravljeni jutri.", time: "14:23", unread: 1, online: true },
  { name: "Luka Krajnc", lastMsg: "Hvala za plačilo!", time: "12:05", unread: 0, online: false },
  { name: "Maja Horvat", lastMsg: "Poglejte tri variante logotipa v prilogi.", time: "вчера", unread: 0, online: true },
  { name: "Eva Mlakar", lastMsg: "Prevod je končan, pošiljam.", time: "25.03", unread: 0, online: false },
];

export default function ClientMessagesPage() {
  const { t } = useI18n();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("client.messages")}
        </h1>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2.5 text-sm focus:border-[var(--color-gold)] focus:outline-2 focus:outline-[var(--color-gold-tint)] transition-all"
        />
      </div>

      <Card className="divide-y divide-[var(--color-border)] !p-0">
        {conversations.map((conv, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-4 hover:bg-[var(--color-bg)] transition-colors cursor-pointer">
            <Avatar name={conv.name} size={44} online={conv.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${conv.unread > 0 ? "font-semibold" : "font-medium"}`}>{conv.name}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{conv.time}</span>
              </div>
              <p className={`text-xs truncate mt-0.5 ${conv.unread > 0 ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
                {conv.lastMsg}
              </p>
            </div>
            {conv.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-[var(--color-gold)] text-[10px] font-semibold text-white flex items-center justify-center shrink-0">
                {conv.unread}
              </span>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}
