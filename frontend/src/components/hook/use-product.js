import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useproduct = () => {
  const [allProducts, setAllProducts] = useState(null);
  const { expenseId } = useParams()
  const getAllProducts = () => {
    
    fetch(`http://localhost:3333/expense/${expenseId}/products`)
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