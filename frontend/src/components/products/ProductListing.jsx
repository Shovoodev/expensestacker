import React from "react";

const ProductListing = ({ totalCost, totalProduct }) => {
  return (
    <tr>
      <td
        colspan="2"
        className="px-4 border-collapse py-2  border-gray-200 text-gray-800"
      >
        Total Products : {totalProduct}
      </td>
      <td colspan="2" className="text-xl flex-initia w-fulll">
        Total Price : {totalCost}
      </td>
    </tr>
  );
};

export default ProductListing;
