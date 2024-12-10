import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useProduct = () => {
  const [allProducts, setAllProducts] = useState(null);
  const { groupId } = useParams();

  const getAllProducts = () => {
    fetch(`http://localhost:3333/${groupId}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, [groupId]);

  return { allProducts, setAllProducts };
};
