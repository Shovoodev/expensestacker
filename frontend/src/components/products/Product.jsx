import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ProductButton from "./ProductButton";
import { useUser } from "../hook/use-user";
import { useNavigate } from "react-router-dom";
import { Trash2, X } from "lucide-react";
import { useParams } from "react-router";
import ProductNavbar from "./ProductNavbar";
import ProductSidebar from "./ProductSidebar";
import ProductListing from "./ProductListing";
import ProductHeader from "./ProductHeader";

const Product = () => {
  const { groupId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((data) => {
        setAllProducts(data);
      })
      .then(() => getAllProducts())
      .then(() => setIsModalOpen(false))
      .catch((error) => console.error(error));
  };
  const deleteCurrentExpenses = async () => {
    const pro = expenseId;
    await fetch(`http://localhost:3333/${groupId}/expense/delete/` + pro, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(() => navigate(`/group/${groupId}/expenses`))
      .catch((error) => console.error(error));
  };

  const getAllProducts = () => {
    setLoading(true);
    fetch(`http://localhost:3333/expense/${expenseId}/products`)
      .then((res) => res.json())
      .then((data) => {
        const totalCost = data.reduce(
          (sum, { price, quantity }) => sum + price * quantity,
          0
        );
        setTotalProduct(data.length);
        setTotalCost(totalCost);
        setAllProducts(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  const getowner = async () => {
    const user = await fetch(`http://localhost:3333/isowner`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    const owner = await fetch(`http://localhost:3333/${expenseId}/isitowner`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (user === owner) {
      setIsOwner(true);
    }
  };
  useEffect(() => {
    getAllProducts();
    getowner();
  }, [expenseId]);

  return (
    <>
      <div className="">
        <ProductHeader
          isOwner={isOwner}
          deleteCurrentExpenses={deleteCurrentExpenses}
        />
      </div>
      <div
        className={`flex ${
          isModalOpen ? " blur-sm disabled:cursor-pointer " : ""
        }`}
      >
        <div className="w-1/7 h-screen ">
          <ProductSidebar />
        </div>
        <div className="flex-1  flex-col space-y-6 md:space-y-8 p-4">
          <ProductNavbar groupId={groupId} />
          <div className="flex justify-between items-center">
            <button
              className="w-42 mt-3 max-w-xs md:max-w-md p-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {!isModalOpen ? <p>Add New Product</p> : <p>Minimize</p>}
            </button>
            <button
              onClick={deleteCurrentExpenses}
              className="text-white gap-3 hover:bg-red-700 bg-black font-medium text-sm px-7 py-2 text-center flex items-center rounded-full hover:scale-110 hover:text-white"
            >
              <Trash2 size={36} strokeWidth={2.25} />
              <span>Delete Expense</span>
            </button>
          </div>

          <div className="bg-white rounded-lg p-4">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left border">Product Name</th>
                  <th className="px-4 py-2 text-left border">Quantity</th>
                  <th className="px-4 py-2 text-left border">Price</th>
                  <th className="px-4 py-2 text-center border">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : allProducts && allProducts.length > 0 ? (
                  allProducts.map(
                    ({ _id, expenseId, name, price, quantity }) => (
                      <ProductButton
                        key={_id}
                        productId={_id}
                        expenseId={expenseId}
                        name={name}
                        price={price}
                        quantity={quantity}
                        setAllProducts={setAllProducts}
                        getAllProducts={getAllProducts}
                      />
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No products found.
                    </td>
                  </tr>
                )}
                <ProductListing
                  totalCost={totalCost}
                  totalProduct={totalProduct}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 bg-gray-100 flex w-[90%] lg:w-[50%] flex-col items-center justify-center max-w-lg rounded-lg shadow-lg p-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full md:w-[280px]"
            >
              <Input
                label="Enter Product Name"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                label="Enter Product Price"
                type="number"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                label="Enter Product Quantity"
                type="number"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
              />
              <div className=" flex">
                <Button
                  className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  type="submit"
                >
                  Add Product
                </Button>
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className=" ml-4  items-center  text-sm text-black mt-4 rounded-lg transition"
                >
                  <div className="flex hover:bg-red-700  hover:text-white p-8 px-2 py-1 mt-3 rounded-lg items-center">
                    <span className=""> Close</span> <X />
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
