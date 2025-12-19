import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Impostor - Juego Social",
  description: "Juego social de deducción para jugar en grupo",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#1a0a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}

