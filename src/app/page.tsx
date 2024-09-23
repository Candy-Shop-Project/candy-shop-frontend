import type { Metadata } from "next";
import MainComponent from "./components/MainPage/MainComponent";
// import { fetchItems, ShopItem } from "../../utils/fetchItems";

export const metadata: Metadata = {
  title: "Candy Shop",
  description: "Candy Shop",
  keywords: "",
};

export default async function Home() {
  //fetching data using util fetch function /utils/dataFetch.tsx
  // const shopItems: ShopItem[] = await fetchItems();

  return (
    <main>
      {/* passing data from db as props to FirstSection component*/}
      <MainComponent />
    </main>
  );
}
