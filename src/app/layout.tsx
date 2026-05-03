import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import ClientShell from "@/components/ui/ClientShell";
import MotionProvider from "@/components/ui/MotionProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RyzeSystems — Tecnologia para saúde",
  description:
    "Criamos sites, sistemas e SmartPages para clínicas e profissionais de saúde que querem crescer com inteligência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ClientShell />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
