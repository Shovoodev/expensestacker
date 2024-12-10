
import { House, Users, Book ,Info, Settings } from "lucide-react";

import { NavLink } from "react-router";

const Sidebar = ({client}) => {
  return (
    <div className="w-[20%] z-50 bg-gray-800 fixed h-full">
      <div>
        <h1 className="text-2xl text-center text-white font-bold border-none mt-3 mb-4">
          {client}
        </h1>
      </div>
      <div>
        
      </div>
      <ul className="mt-3 text-white font-mono ml-3">
      <NavLink to="/"> 
        <li  className=" mb-2 rounded hover:shadow hover:bg-gray-400 py-2">
          
        <Book className=" inline-block w-6 h-6 mr-2 -mt-2" /> Home
        </li>
        </NavLink>  
        <li  className=" mb-2 rounded hover:shadow hover:bg-gray-400 py-2">
         <NavLink to="/"><Book className=" inline-block w-6 h-6 mr-2 -mt-2" /> Content</NavLink>  
        </li>
        <li  className=" mb-2 rounded hover:shadow hover:bg-gray-400 py-2">
         <NavLink to="/group/:id"><Info className=" inline-block w-6 h-6 mr-2 -mt-2" /> About</NavLink>  
        </li>
        <li  className=" mb-2 rounded hover:shadow hover:bg-gray-400 py-2">
         <NavLink to="/group/:id"><Settings className=" inline-block w-6 h-6 mr-2 -mt-2" /> Settings</NavLink>  
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
