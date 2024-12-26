import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ProductButton from "./ProductButton";
import GeneralNavbar from "../main/GeneralNavbar";
import { useUser } from "../hook/use-user";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { NavLink, useParams } from "react-router";
const Product = () => {
  const { user } = useUser();
  const [totalCost, setTotalCost] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenseId } = useParams();
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3333/expense/${expenseId}/product/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((data) => {
        setAllProducts(data);
      })
      .then(() => getAllProducts())
      .then(() => setIsModalOpen(false))
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteCurrentExpenses = async () => {
    const pro = expenseId;
    await fetch(`http://localhost:3333/expense/delete/` + pro, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/groups`))
      .catch((error) => {
        console.error(error);
      });
  };
  const getAllProducts = () => {
    fetch(`http://localhost:3333/expense/${expenseId}/products`)
      .then((res) => res.json())
      .then((data) => {
        const totalCost = data.reduce((sum, { price, quantity }) => {
          return sum + price * quantity;
        }, 0);

        setTotalCost(totalCost);
        setAllProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getAllProducts();
    setAllProducts(allProducts);
    setTotalCost();
    setLoading(false);
  }, [setNewProduct, setAllProducts]);
  return (
    <>
      <GeneralNavbar
        fieldHeader="Expense done by Member "
        client={user?.username}
      />
      <div className="flex justify-center flex-col space-y-6 md:space-y-8">
        <div className="flex justify-between">
          <div>
            <button
              className="w-42 mt-3 max-w-xs md:max-w-md p-1 ml-12 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
                  onClick={() => setIsModalOpen(true)}
                >
                  ADD PRODUCT
                </Button>
              </form>
            </div>
          )}
          <div className=" first-letter:text-teal-900 text-xl">
            <p> This Below expense done by user {user?.username} </p>
          </div>
          <div className=" p-3 pt-1 float-end">
            <button
              onClick={deleteCurrentExpenses}
              className="text-white gap-3 hover:bg-red-700 bg-black font-medium text-sm px-7 py-2 text-center me-2 
              flex items-center p-2 mt-7 rounded-full hover:scale-110 hover:text-white dark:text-white  dark:hover:bg-red-700 group
              "
            >
              <Trash2
                className=""
                size={36}
                strokeWidth={2.25}
                absoluteStrokeWidth
              />
              <span> delete expense</span>
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
              ) : allProducts && allProducts.length > 0 ? (
                allProducts.map(({ _id, expenseId, name, price, quantity }) => {
                  const productId = _id;
                  return (
                    <>
                      <ProductButton
                        key={_id}
                        productId={_id}
                        expenseId={expenseId}
                        name={name}
                        price={price}
                        quantity={quantity}
                        children="Edit"
                        setAllProducts={setAllProducts}
                        getAllProducts={getAllProducts}
                      ></ProductButton>
                    </>
                  );
                })
              ) : (
                <p>No product found.</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center text-2xl">
          Total Spend on this Listing : {totalCost} €
        </div>
      </div>
    </>
  );
};

export default Product;
