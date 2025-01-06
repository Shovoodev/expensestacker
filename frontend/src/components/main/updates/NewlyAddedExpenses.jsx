import React, { useEffect, useState } from "react";

const NewlyAddedExpenses = ({ expensename, created_at, group_id }) => {
  const [totalGroupExpense, setTotalGroupExpense] = useState();
  const [doneBy, setDoneBy] = useState();
  const getAllExpenses = async () => {
    await fetch(`http://localhost:3333/${group_id}/totalcostofproducts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce((sum, { totalCost }) => sum + totalCost, 0);
        setTotalGroupExpense(total);
        const registerExpeses = data?.map((id) => id.done_By);
        console.log({ registerExpeses });
        setDoneBy(registerExpeses);
      });
  };

  useEffect(() => {
    getAllExpenses();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-md mx-auto mb-4">
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300">
          Tag
        </button>

        <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300">
          Product
        </button>
      </div>

      <div className="relative rounded-lg ">
        <div className=" flex flex-col justify-center items-center text-center ">
          <h2 className="text-lg font-semibold">{expensename}</h2>
          <p className="text-sm">Total: {totalGroupExpense} £</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Date:</span> {created_at}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Done By Member:</span> {doneBy}
        </p>
      </div>
    </div>
  );
};

export default NewlyAddedExpenses;
