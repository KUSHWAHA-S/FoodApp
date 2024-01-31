import React, { useState, useEffect } from "react";

import axios from "axios";
import Table from "./Table";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Read = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [search, setSearch] = useState("");
  // const [results,setSearchResults] =useState([]);
  const [records, setRecords] = useState([]);

  function getData() {
    axios

      .get("http://localhost:8080/user/show/vendor")

      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        setLoading(false);
        console.log(isLoading);
        
      });
  }
  const Filter = (event) => {
    console.log(event.target.value);
    setRecords(
      data.filter((f) =>
        f.name.toLowerCase().includes(event.target.value)
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <div className="container">
        <h1>Vendor's List</h1>
        
     </div> */}
     <h1>Vendor List</h1>
      
      <form>
        <div className="form-group search-input">
          <FaSearch />
          <input type="text" placeholder="Search by Name.." onChange={Filter} />
        </div>
         
      </form>
      {/* <Link to="/viewshops">
        <button className="btn btn-dark bu">
          View shops
        </button>
      </Link> */}
      
      

      <Table isLoading={isLoading} data={records} />
    </>
  );
};

export default Read;
