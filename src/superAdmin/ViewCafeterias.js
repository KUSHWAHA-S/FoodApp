import React, { useState, useEffect } from "react";

import axios from "axios";
import CafeteriaTable from "./CafeteriaTable";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ViewCafeterias = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [search, setSearch] = useState("");
  // const [results,setSearchResults] =useState([]);
  const [records, setRecords] = useState([]);

  function getData() {
    axios

      .get("https://64365a168205915d34f1423b.mockapi.io/alan")

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
        f.shop_name.toLowerCase().includes(event.target.value)
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className=" container">
        <h1>Cafe Details</h1>
        <Link to="/viewadmins">
          <button className="btn btn-dark bu">Back</button>
        </Link>
      </div>
      <form>
        <div className="form-group search-input">
          <FaSearch />
          <input type="text" placeholder="Type to search.." onChange={Filter} />
        </div>
      </form>

      <CafeteriaTable isLoading={isLoading} data={records} />
    </>
  );
};

export default ViewCafeterias;
