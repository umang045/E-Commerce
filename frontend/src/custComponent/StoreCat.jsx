import React, { useState } from "react";
import { useProductFunction } from "../Hooks/useGetAllProducts";

const StoreCat = () => {
  const { categories } = useProductFunction();
  // console.log(categories);
  const [category, setCategories] = useState([]);
  console.log(category);
  return (
    <div className="filter-card mb-3">
      <h3 className="filter-title">Shop By Categories</h3>
      <ul className="ps-0 d-flex flex-wrap gap-15">
        {categories &&
          [...new Set(categories)]?.map((item, index) => {
            return (
              <li
                key={index}
                style={{
                  borderBottom: item === category ? "1px solid black" : "",
                }}
                onClick={() => {
                  if (category == null) {
                    setCategories(item);
                  } else if (category == item) {
                    setCategories(null);
                  } else {
                    setCategories(item);
                  }
                }}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default StoreCat;
