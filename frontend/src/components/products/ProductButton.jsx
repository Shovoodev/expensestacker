import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hook/use-product";

const ProductButton = ({name , className, productId, type = "button" ,price, quantity, deletedProduct }) => {

  const { getAllProducts , allProducts } = useProduct("");
  const {groupId } = useParams()
  const deleteProduct = async () => {
    const pro = productId 
    await fetch(`http://localhost:3333/${groupId}/product/delete/`+ pro,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(()=>getAllProducts())
      .catch((error) => {
        console.error(error);
      })
      
  };
  useEffect(()=>{
    allProducts?.length && deletedProduct(allProducts)
  }, [allProducts])

  return (
    <div className={"flex gap-3  " + className}>
      <table className="flex gap-3 mt-2 w-48 bg-white border-gray-200 z-10">
          <td> {name}</td>
          <td> {quantity}</td>
          <td> {price}</td>
      </table>
      <button onClick={deleteProduct} className="text-sm bg-red-500 rounded text-white p-1">
        Delete
      </button>
    </div>
  );
};

export default ProductButton;
