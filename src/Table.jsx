import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link} from "react-router-dom";


import "./table.css"

function Table() {
  const [data, setData] = useState([]);
  
  //const [searchQuery, setSearchQuery] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8090/api/collections/student_management/records/');
      // const fetchedData = response.data;
      setData(response.data.items);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try{
        const response = await axios.delete(`http://127.0.0.1:8090/api/collections/student_management/records/${id}`);
        if(response){
            getData();
        }
    }catch(error){
        console.log(error);
    }
}


  useEffect(() => {
    getData();
  }, []);

  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const filteredData = data.filter((item) => {
  //   const { fullname,gender,age,faculty,department,email,mobilenumber,careerCounseling } = item;
  //   const lowerCaseSearchQuery = searchQuery.toLowerCase();
  //   return (
  //     fullname.toLowerCase().includes(lowerCaseSearchQuery) ||
  //     gender.toLowerCase().includes(lowerCaseSearchQuery) ||
  //     age.toLowerCase().includes(lowerCaseSearchQuery)||
  //     faculty.toLowerCase().includes(lowerCaseSearchQuery)||
  //     department.toLowerCase().includes(lowerCaseSearchQuery)||
  //     email.toLowerCase().includes(lowerCaseSearchQuery)||
  //     mobilenumber.toLowerCase().includes(lowerCaseSearchQuery)||
  //     careerCounseling.toLowerCase().includes(lowerCaseSearchQuery)
       
  //   );
  // });

  return (
    <div className='main' >
      {/* <div className='header'>
      <input
        type="text"
        placeholder="Search for an account"
        // value={searchQuery}
        // onChange={handleSearchInputChange}
      />
      <button style={{width:"10%",margin:"0",marginLeft:"auto"}}>Logout</button>
      </div> */}
      <div className='table-container'>
      
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
      
        <thead>
        
          <tr>
            <th>Fullname</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Faculty</th>
            <th>Department</th>
            <th>Email</th>
            <th>MobileNumber</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td >
                {item.fullname}
              </td>
              <td >{item.gender}</td>
              <td>{item.age}</td>
              <td>{item.faculty}</td>
              <td>{item.department}</td>
              <td>{item.email}</td>
              <td>{item.mobilenumber}</td>
              <td>
              <Link   to={`/${item.id}/Update`}>Edit</Link>&nbsp;
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Table;