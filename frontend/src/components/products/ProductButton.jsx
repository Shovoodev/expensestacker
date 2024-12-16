import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import DeleteButton from "../ui/DeleteButton";
import { useproduct } from "../hook/use-product";
import Button from "../ui/Button";

const ProductButton = ({
  name,
  className,
  productId,
  children,
  type = "button",
  price,
  quantity,
  onClick,
}) => {
  const [updateProduct, setUpdateProduct] = useState();
  const { expenseId } = useParams();
  const [updateMode, setUpdateMode] = useState(true);
  const { setAllProducts, allProducts } = useproduct();
  const deleteProduct = async () => {
    const pro = productId;
    await fetch(
      `http://localhost:3333/expense/${expenseId}/product/delete/` + pro,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {}, [setAllProducts, allProducts]);
  return (
    <>
      <tr className={" " + className}>
        <td className="px-4 py-2 border border-gray-200 text-gray-800">
          {" "}
          {name}
        </td>
        <td className="px-8 py-2 border border-gray-200 text-gray-800">
          {" "}
          {price}
        </td>
        <td className="px-4 py-2 border border-gray-200 text-gray-800">
          {" "}
          {quantity}
        </td>
        <td className="px-8 py-2  flex gap-3 items-center justify-center border border-gray-200 text-gray-800">
          <button
            onClick={onClick}
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
          >
            <NavLink to={`/expense/${expenseId}/product/${productId}`}>
              {children}
            </NavLink>
          </button>
          <DeleteButton onClick={() => deleteProduct()} />
        </td>
      </tr>
    </>
  );
};

export default ProductButton;
