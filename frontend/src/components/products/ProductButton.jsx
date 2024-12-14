import React, { useEffect } from "react";
import { useParams } from "react-router";
import DeleteButton from "../ui/DeleteButton";

const ProductButton = ({name , className, productId, type = "button" ,price, quantity, deletedProduct }) => {
  const {groupId } = useParams()
  const deleteProduct = async () => {
    const pro = productId 
    await fetch(`http://localhost:3333/product/delete/`+ pro,{
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
  return (
    <tr className={" " + className}>
          <td className="px-4 py-2 border border-gray-200 text-gray-800"> {name}</td>
          <td className="px-4 py-2 border border-gray-200 text-gray-800"> {quantity}</td>
          <td className="px-8 py-2 border border-gray-200 text-gray-800"> {price}</td>
          <td className="px-8 py-2  flex gap-3 items-center justify-center border border-gray-200 text-gray-800">
          <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700  dark:focus:ring-green-800"> Edit</button>  <DeleteButton/>
          </td>
    </tr>
  );
};

export default ProductButton;
