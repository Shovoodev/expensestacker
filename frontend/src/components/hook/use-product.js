import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useproduct = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [totalCost , setTotalCost] = useState(0)
  const { expenseId } = useParams()
  const getAllProducts = () => {
    
    fetch(`http://localhost:3333/expense/${expenseId}/products`)
      .then((res) => res.json())
      .then((data) => {
        data.map((product) => {
          console.log(`Product: ${JSON.stringify(product.price)}`);
        });        
        setAllProducts(data);
      }).then((data) => {
        const total = data.reduce((sum, product) => sum + product.price * product.quantity, 0);
        console.log(`Total Cost: ${total}`);
        setTotalCost(total)
  })
      
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllProducts()

  }, []);

  return { allProducts, setAllProducts ,setTotalCost, totalCost};
};