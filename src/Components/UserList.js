import axios from "axios";
import React, { useState, useEffect } from "react";
import trash from "./../trash.svg";

const PROXY = "https://jekaloapitest.herokuapp.com/api";

const UserList = ()=>{
  let [users, setUsers] = useState(null);
  let [processing, setProcessing] = useState(false);
  let [wentWrong, setWentWrong] = useState(false);

  useEffect(()=>{
    axios.get(`${PROXY}/users`).then(data=>{
      console.log(data)
      setUsers(data.data)
    }).catch(error=>{
      console.log(error);
    })
  },[])

  const deleteUser=async(user)=>{
    if(processing) return;
    try {
      setProcessing(true);
      setWentWrong(false);
      let {data} = await axios.delete(`${PROXY}/${user}`);
      console.log(data);
      setUsers((prev)=>[...prev.filter((iter)=>iter.username !== user)])      
    } catch (error) {
      setWentWrong(true);
    }
    finally{
      setProcessing(false)
    }
  }
  return(
    <div>
      <div className="head">
        Users
      </div>
      <div className="wentwrong">
        {wentWrong && "Something went wrong, retry"}
      </div>
      <table className="table">
        <tbody>
         {users && users.map((user)=>(
           <tr key={user.username}>
             <td className="">
               <span className="prefix">
                  {user.name_prefix}
               </span>
             </td>
             <td>
               {user.username}
             </td>
             <td className="fullname">
               {user.first_name } {user.last_name?user.last_name:""}
             </td>
             <td>
               {user.date_of_birth}
             </td>
             <td className="end-list">  
               <span onClick={()=>deleteUser(user.username)} className="trash">
                  <img src={trash} alt="Trash" />
               </span>
               
             </td>
           </tr>
         ))
         
            
          }
        </tbody>
      </table>

    </div>
  )
}


export default UserList;