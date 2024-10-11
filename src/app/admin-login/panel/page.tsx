import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";
import Instructions from "./components/Instructions";

export default function Page() {
  return (
    <div className="container mx-auto p-6 pt-16 md:pt-20">
      <p className="text-3xl font-bold mb-6">Admin Panel Page</p>

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
