import type { Metadata } from "next";
import FirstSection from "./components/MainPage/FirstSection";
import { fetchItems, ShopItem } from "../../utils/dataFetch";

export const metadata: Metadata = {
  title: "Candy Shop",
  description: "Candy Shop",
  keywords: "",
};

export default async function Home() {
  //fetching data using util fetch function /utils/dataFetch.tsx
  const shopItems: ShopItem[] = await fetchItems();

  return (
    <main>
      {/* passing data from db as props to FirstSection component*/}
      <FirstSection shopItems={shopItems} />
    </main>
  );
}
