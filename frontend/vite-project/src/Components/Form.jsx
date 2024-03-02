import { useEffect, useState,useMemo } from "react";

import  '../App.css'

function Form(){
    
    const [users,setUsers]=useState([])
    const [filter,setFilter]=useState("")
    const [selectedSortValue,setSelectedSortValue]=useState("default");
    const [usersData,setUsersData]=useState([])

    useEffect(()=>{
       
        fetch('http://localhost:7000/users')
        .then(async(res)=>{
            
            const d=await res.json();
            
            const users=d.data;
            setUsers(users)
            setUsersData(users)
            
        })


    },[])


    const handleOnChange = (e) => {
        setSelectedSortValue(e.target.value);
    
        const sortedData = [...users];
    
        if (e.target.value === "default") {
            setUsers(usersData);
            return;
        }
    
        sortedData.sort((a, b) => {
            if (e.target.value === "date") {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            } else if (e.target.value === "time") {
                return a.id - b.id;
            }
        });
    
        setUsers(sortedData);
    }
    

    

    const filteredUsers =useMemo(function(){
        return users.filter(x => x.username.toLowerCase().includes(filter) || x.location.toLowerCase().includes(filter))
     },[filter,users]);

    return(
        <div>
            
            <input placeholder="search" onChange={(e)=>setFilter(e.target.value.toLowerCase())} className="p-2 m-2 border border-black  "/>
             
    <label>
     Sort by:
      <select name="selectedSortValue"   value={selectedSortValue} onChange={(e)=>handleOnChange(e)}>
      <option value="default">default</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
    </label>

   
           
           <table>
            
            <thead>
                <tr>
                    <th>S.NO.</th>
                    <th>CUSTOMER NAME</th>
                    <th>AGE</th>
                    <th>PHONE NUMBER</th>
                    <th>LOCATION</th>
                    <th>CREATED_AT</th>

                </tr>
            </thead>

            <tbody>
             {filter===""? users.map((user)=>{
                    return (
                        <tr key={user.id}>
                           <td>{user.id}</td>
                           <td>{user.username}</td>
                           <td>{user.age}</td>
                           <td>{user.phonenumber}</td>
                           <td>{user.location}</td>
                           <td>{user.created_at}</td>
                        </tr>
                    )
                }): 
                filteredUsers.map((user)=>{
                    return (
                        <tr key={user.id}>
                           <td>{user.id}</td>
                           <td>{user.username}</td>
                           <td>{user.age}</td>
                           <td>{user.phonenumber}</td>
                           <td>{user.location}</td>
                           <td>{user.created_at}</td>
                        </tr>
                    )
                })}
            </tbody>
             
           </table>
        </div>
    )
}

export default Form;