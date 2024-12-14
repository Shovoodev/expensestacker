import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useGroup = () => {
  const [allGroups, setAllGroups] = useState(null);
  const getAllGroups = async() => {
    await fetch(`http://localhost:3333/groups`, { credentials:"include"})
      .then((res) => res.json())
      .then((data) => {
        setAllGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllGroups();
  }, [setAllGroups]);
  
  return { allGroups , setAllGroups };
};
