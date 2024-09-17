export interface ShopItem {
  name: string;
  description: string;
  price: number;
  image_url: string;
}

//fetching items from django/heroku(db)
export const fetchItems = async (): Promise<ShopItem[]> => {
  try {
    // change later for env variable in order if backend url changes
    const res = await fetch("http://127.0.0.1:8000/shop/products", {
      //candy products endpoint
      cache: "no-store", //data fetched serverside, so no caching (in case items in db update frequently)
    });

    if (!res.ok) {
      //if response is not ok, return an empty array
      console.error("Failed to fetch items. Server responded with an error.");
      return [];
    }

    const items: ShopItem[] = await res.json(); //convert to json
    return items;
  } catch (error) {
    //catch any network or other errors
    console.error("Error fetching data:", error);
    return []; //return empty array on error
  }
};
