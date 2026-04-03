import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
