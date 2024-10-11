import type { Metadata } from "next";
import MainComponent from "./components/MainPage/MainComponent";

export const metadata: Metadata = {
  title: "CandyShop - Sweets, Treats, and More",
  description:
    "Discover a delightful selection of chocolates, candies, marshmallows, cakes, cookies, gummies, lollipops, licorice, and beverages at CandyShop. Indulge in your favorite treats!",
  keywords:
    "CandyShop, chocolates, candies, marshmallows, cakes, cookies, gummies, lollipops, licorice, beverages, sweets, treats",
};

export default async function Home() {
  return (
    <main>
      <MainComponent />
    </main>
  );
}
