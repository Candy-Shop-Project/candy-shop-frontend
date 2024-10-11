import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; //import the providers component
// import GoogleAnalytics from "./GoogleAnalytics/GoogleAnalytics";
import type { Metadata } from "next";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        {/* <GoogleAnalytics /> */}
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
