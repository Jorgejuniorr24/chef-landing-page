import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// ✅ Corrigido — imports default (sem chaves)
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Chef Henrique | Experiências Gastronômicas Únicas",
  description:
    "Especialista em gastronomia contemporânea com sabores que contam histórias. Jantares privativos, eventos corporativos e consultoria gastronômica.",
  keywords: "chef, gastronomia, jantares privativos, eventos, Salvador, Bahia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
