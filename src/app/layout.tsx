import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; //import the providers component
// import GoogleAnalytics from "./GoogleAnalytics/GoogleAnalytics";
import type { Metadata } from "next";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/icon.png",
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
        </body>
      </html>
    </Providers>
  );
}
