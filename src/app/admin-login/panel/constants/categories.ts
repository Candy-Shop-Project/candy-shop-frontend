// put all categories that project has in this file(in object form)
// object used accross multiple files, be careful in modifying and adding categories in correct format
// not used only in AddProduct.ListProduct components(admin panel). addOrUpdateCategories.ts file object used in this case.

// used for database query, put value exactly as it used to fetch backend
export const categories = [
  { label: "All", value: null },
  { label: "Cakes", value: "cake" },
  { label: "Cookies", value: "cookie" },
  { label: "Candies", value: "candy" },
  { label: "Chocolate", value: "chocolate" },
  { label: "Gummies", value: "gummies" },
  { label: "Lollipop", value: "lollipop" },
  { label: "Marshmallow", value: "marshmallow" },
  { label: "Licorice", value: "licorise" },
  { label: "Beverages", value: "beverage" },
];

// to add new category to database, use backend_url.com/shop/add_category/, pass object in following format ("name" : "category"). POST request

// to check what id was assigned to added category, use heroku data clips.
