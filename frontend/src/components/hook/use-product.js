import { useEffect, useState } from "react";

export const useproduct = () => {
  const [allProducts, setAllProducts] = useState(null);

  const getAllProducts = () => {
    fetch(`http://localhost:3333/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProducts()

  }, []);

  return { allProducts, setAllProducts };
};