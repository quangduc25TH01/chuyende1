import type { Metadata } from "next";
import ButtonScrollOnTop from "@/components/ButtonScrollOnTop";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import SupportButtons from "@/components/SupportButtons";
import { information } from "@/config/data/information";

import "./globals.css";
import "./app.scss";

export const metadata: Metadata = {
  title: `${information.shopName}`,
  description: "Trang chủ",
  icons: "ly-icon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>

        <ButtonScrollOnTop />
        <SupportButtons />
      </body>
    </html>
  );
}
