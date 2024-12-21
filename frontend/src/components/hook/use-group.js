import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useGroup = () => {
  const [allGroups, setAllGroups] = useState(null);
  const [link , setLink] = useState("")
  const [groupUser , setGroupUser] = useState(null)
  const [addMember , setAddMember] = useState(null)
  const getAllGroups = async() => {
    await fetch(`http://localhost:3333/groups`, { credentials:"include"})
      .then((res) => res.json())
      .then((data) => {
        data.map(( link)=>{
          return  setLink(link)
        })
        setAllGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const assignedUserOnGroup = () =>{
    fetch(`http://localhost:3333/${userId}/${groupId}/join`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => {
        setAddMember(allGroups);
      })
      .then(()=> userGroups())
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getAllGroups();
  }, [setAllGroups]);
  
  
  
  return { allGroups , setAllGroups};
};

