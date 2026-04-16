
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Dent Luna",
  description: "Your trusted dental care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Dent Luna" />
      </head>
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        <Header />
        <main className="container mx-auto mt-8 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}