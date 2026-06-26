import { Sora, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "./_components/SiteChrome";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bio-A | Design Biofílico e Curadoria Premium",
  description:
    "Site institucional da Bio-A: curadoria de plantas, projetos biofílicos e consultoria para ambientes residenciais e corporativos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${playfair.variable} ${geistMono.variable} antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
