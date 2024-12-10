import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ProductButton from "./ProductButton";
import { useProduct  } from "../hook/use-product";
import { useParams } from "react-router";
const Product = () => {
  const { groupId} = useParams()
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const { setAllProducts, allProducts } = useProduct("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    registerProduct()
    // await fetch(`http://localhost:3333/${groupId}/product/register`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newProduct),
    // }).then(()=>setAllProducts(allProducts))
    // .catch((error) => {
    //   console.error(error);
    // })
  };
  const registerProduct = async() => {
    await fetch(`http://localhost:3333/${groupId}/product/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(()=>setAllProducts(allProducts))
    .catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    allProducts?.length && setProduct(allProducts);
  }, [allProducts]);

  useEffect(() => {
    setLoading(true);
    getAllProducts();
    setLoading(false);
  }, [setNewProduct, setAllProducts]);
  return (
    <>
      <div className="flex justify-center border w-[40%] rounded-xl ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-xs md:flex md:justify-center mb-6 pt-4"
        >
          <Input
            label="Enter Group Name "
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
          <Button type="submit">ADD EXPENSES</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-1 p-6">
        {loading ? (
          <p> Loading ....</p>
        ) : (
          product?.map(({ _id, groupId, name, price, quantity }) => {
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
        )}
      </div>
    </>
  );
};

export default Product;
