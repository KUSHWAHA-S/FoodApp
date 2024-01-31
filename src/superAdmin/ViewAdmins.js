import React, { useState, useEffect } from "react";

import axios from "axios";
import AdminTable from "./AdminTable";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ViewAdmins = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [search, setSearch] = useState("");
  // const [results,setSearchResults] =useState([]);
  const [records, setRecords] = useState([]);

  function getData() {
    axios

      .get("http://localhost:8080/user/show/Admin")

      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        setLoading(false);
        console.log(res.data);
        console.log(isLoading);
      });
  }
  const Filter = (event) => {
    console.log(event.target.value);
    setRecords(
      data.filter((f) =>
        f.vendor_name.toLowerCase().includes(event.target.value)
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className=" container">
        <h1>Admin's List</h1>
        <Link to="/superadmin">
          <button className="btn btn-dark bu">Back</button>
        </Link>
      </div>
      <form>
        <div className="form-group search-input">
          <FaSearch />
          <input type="text" placeholder="Type to search.." onChange={Filter} />
        </div>
      </form>

      <AdminTable isLoading={isLoading} data={records} />
    </>
  );
};

export default ViewAdmins;
