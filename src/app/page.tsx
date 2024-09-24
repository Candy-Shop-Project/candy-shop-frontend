import type { Metadata } from "next";
import MainComponent from "./components/MainPage/MainComponent";

export const metadata: Metadata = {
  title: "Candy Shop",
  description: "Candy Shop",
  keywords: "",
};

export default async function Home() {
  return (
    <main>
      <MainComponent />
    </main>
  );
}
