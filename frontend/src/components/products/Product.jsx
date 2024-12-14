import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ProductButton from "./ProductButton";
import GeneralNavbar from "../main/GeneralNavbar";
import { useUser } from "../hook/use-user";
import { useParams } from "react-router";
const Product = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groupId , expenseId } = useParams()
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [loading , setLoading] = useState(false)
  const [product, setProduct] = useState();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    registerProductOnExpenses();
  };
  const registerProductOnExpenses = async () => {
    await fetch(
      `http://localhost:3333/group/${groupId}/expense/${expenseId}/product/register`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    )
      .then((data) => {
        setProduct(data);
      }).then(()=> getAllProducts()).then(()=> setIsModalOpen(false))
      .catch((error) => {
        console.error(error);
      })
  };
  const getAllProducts = () => {
    fetch(`http://localhost:3333/group/${groupId}/expense/${expenseId}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProducts()

  }, []);


  // useEffect(() => {
  //   setLoading(true);
  //   setAllProducts();
  //   setLoading(false);
  // }, [setNewProduct, setAllProducts]);
  return (
    <>
      <GeneralNavbar  fieldHeader="All products of " client={user?.username}/>
      <div className="flex justify-center flex-col space-y-6 md:space-y-8">
      <div className="flex justify-between">
        <div>

          <button
            className="w-42 max-w-xs md:max-w-md p-1 ml-12 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            {!isModalOpen ? <p> Add New Product</p> : <p> Minimize </p>}
          </button>
        </div>
          {isModalOpen && (
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
                  ADD EXPENSES
                </Button>
              </form>
            </div>
          )}
          <div>
          <button
            className="text-white bg-red-700 uppercase hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700  dark:red:ring-green-800"
          >
            Delete Expense
          </button>
        </div>
        </div>
        <div className="flex flex-col ml-8 gap-4 w-[52%] max-w-4xl  bg-white rounded-lg p-4">
          <table className=" w-[50%] table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-300">
                  Product Name
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-200">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-200">
                  Quantity
                </th>
                <th className="px-4 py-2 text-center text-gray-700 font-medium border border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="ml-9">
              {loading ? (
          <p>Loading...</p>
        ) : product && product.length > 0 ? (
          product.map(({ _id, groupId, name, price, quantity }) => {
            return (
              <ProductButton
                        deletedProduct={setProduct}
                        key={_id}
                        productId={_id}
                        groupId={groupId}
                        name={name}
                        price={price}
                        quantity={quantity}
                      ></ProductButton>
            );
          })
        ) : (
          <p>No product found.</p>
        )}
            </tbody>
          </table>
        </div>
        

      </div>
    </>
  );
};

export default Product;
