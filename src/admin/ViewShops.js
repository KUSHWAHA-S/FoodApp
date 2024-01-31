import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ShopTable from "./ShopTable";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ViewShops = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  //console.log(match)
  function getData() {
    //console.log(id);
    axios

      .get(`http://localhost:8080/user/shopsBy/${localStorage.getItem("UserId")}`)

      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        setLoading(false);
        // console.log(res.data);
        // console.log(isLoading);
        
      });
  }
  const Filter = (event) => {
    console.log(event.target.value);
    setRecords(
      data.filter((f) =>
        f.shopName.toLowerCase().includes(event.target.value)
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <div className=" container">
        <h1>Shop Details</h1>
        
      </div> */}
      <h1>Shop Details</h1>
      <form>
        <div className="form-group search-input">
          <FaSearch />
          <input type="text" placeholder="Search by Name.." onChange={Filter} />
        </div>
      </form>

      <ShopTable isLoading={isLoading} data={records} />
    </>
  );
};

export default ViewShops;
