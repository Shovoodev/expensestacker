import React from "react";
import { X } from "lucide-react";
const NewlyAddedExpenses = ({ expensename, created_at }) => {
  return (
    <div>
      <div className=" flex  justify-between"></div>
      <div className=" h-26 w-56 bg-white">
        <div className=" flex justify-start gap-2 p-1 ">
          <button className=""> tag</button> <button> type</button>
          <button>product</button>
        </div>
        <div className="relative max-w-xl mx-auto">
          <img
            className="h-14 w-full object-cover rounded-md"
            src="/expense.jpg"
            alt="Random image"
          />
          <div className="absolute inset-0 bg-gray-700 opacity-80 rounded-md"></div>
          <div className="absolute gap-4 inset-0 flex items-center justify-evenly">
            <h2 className="text-white text-cl font-bold">{expensename}</h2>
            <h2 className="text-white text-cl font-bold">Total : £</h2>
          </div>
        </div>
        <div className=" items-center">data : {created_at}</div>
        <div className=" mb-2">User :</div>
      </div>
    </div>
  );
};

export default NewlyAddedExpenses;
