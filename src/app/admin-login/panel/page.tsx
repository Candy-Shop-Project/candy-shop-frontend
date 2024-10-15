"use client";
import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";
import Instructions from "./components/Instructions";
import Link from "next/link";

export default function Page() {
  async function handleExit() {
    localStorage.removeItem("isAdmin");

    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      console.log("User logged out");
    } else {
      console.log("Some error loggin out user");
    }
  }

  return (
    <div className="container mx-auto p-6 pt-16 md:pt-20">
      <p className="text-3xl font-bold mb-6">Admin Panel Page</p>
      <Link href="/">
        <p
          onClick={handleExit}
          className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 px-4 py-2 rounded-lg text-center transition duration-200 cursor-pointer w-40"
        >
          Exit Admin Mode
        </p>
      </Link>

      {/* left side */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <AddProduct />
          <Instructions />
        </div>

        {/* right side */}
        <div className="w-full md:w-1/2">
          <ListProducts />
        </div>
      </div>
    </div>
  );
}
