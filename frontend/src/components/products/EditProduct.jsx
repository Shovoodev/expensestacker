import React from "react";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import GeneralNavbar from "../main/GeneralNavbar";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const navigate = useNavigate();
  const { productId, expenseId } = useParams();

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3333/product/update/` + productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        return navigate(`/expense/${expenseId}/products`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <GeneralNavbar fieldHeader="All products of " />
      <div className=" ml-8 bg-gray-100 flex w-80 flex-col items-center justify-center  max-w-lg  rounded-lg shadow-lg p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-[280px] md:flex md:justify-center mb-6 pt-4 space-y-2"
        >
          <Input
            label="Enter Product Name "
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <Input
            label="Enter Product Price "
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <Input
            label="Enter Product quantity "
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
          <Button
            className="mt-6 mb-2  w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            type="submit"
          >
            UPDATE PRODUCT
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
