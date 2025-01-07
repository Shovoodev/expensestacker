import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ProductButton from "./ProductButton";
import GeneralNavbar from "../main/GeneralNavbar";
import { useUser } from "../hook/use-user";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router";
import ProductNavbar from "./ProductNavbar";
import ProductSidebar from "./ProductSidebar";
import ProductListing from "./ProductListing";

const Product = () => {
  const { groupId } = useParams();

  const { user } = useUser();
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

  useEffect(() => {
    getAllProducts();
  }, [expenseId]);

  return (
    <>
      <div className="">
        <GeneralNavbar
          fieldHeader="Expense done by Member"
          client={user?.username}
        />
      </div>
      <div className="flex">
        <div className="w-1/5 h-screen ">
          <ProductSidebar />
        </div>
        <div className="flex-1 flex flex-col space-y-6 md:space-y-8 p-4">
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

          {isModalOpen && (
            <div className="bg-gray-100 flex flex-col items-center justify-center max-w-lg rounded-lg shadow-lg p-6">
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
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <Input
                  label="Enter Product Quantity"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                />
                <Button
                  className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  type="submit"
                >
                  Add Product
                </Button>
              </form>
            </div>
          )}

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
    </>
  );
};

export default Product;
