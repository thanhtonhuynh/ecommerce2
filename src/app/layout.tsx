import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/Footer";
import { ShoppingCartProvider } from "@/_hooks/useShoppingCart";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESHOP",
  description: "A simple e-commerce store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-700`}>
        <Toaster />

        <ShoppingCartProvider>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
