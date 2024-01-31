import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";

const setData = (data, id1) => {
  //console.log(data[0], id1);
  let {
    id,
    vendor_name,
    // shop_name,
    vendor_email,
    vendor_phone,
    // city,
    // cafetaria,
    // description,
    password,
    address,
  } = data[id1 - 1];
  localStorage.setItem("ID", id);
  localStorage.setItem("VendorName", vendor_name);
  localStorage.setItem("VendorEmail", vendor_email);
  localStorage.setItem("VendorPhone", vendor_phone);
  // localStorage.setItem("ShopName", shop_name);
  // localStorage.setItem("City", city);
  // localStorage.setItem("Cafetaria", cafetaria);
  // localStorage.setItem("Description", description);
  localStorage.setItem("Password", password);
  localStorage.setItem("Address", address);
  //console.log(vendor_name);
};

const AdminTable = ({ data, isLoading }) => {
  function handleDelete(id) {
    axios

      .delete(`https://64365a168205915d34f1423b.mockapi.io/alan/${id}`)

      .then(() => {
        //  getData();
        window.location.reload(true);
      });
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="table-container">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              {/* <th scope="col">Id</th> */}
              <th scope="col">Admin Name</th>

              <th scope="col"> Email</th>
              <th scope="col">Phone number</th>

              <th scope="col">Address</th>
              <th scope="col">Cafeteria's</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

         
          {data.map((eachData) => {
            return (
              <>
                <tbody className="">
                  <tr>
                    {/* <th scope="row" key={eachData.id}></th> */}
                    <td>{eachData.name}</td>

                    <td>{eachData.email}</td>
                    <td>{eachData.phone}</td>

                    <td>{eachData.address}</td>
                    <td>
                      <Link to="/viewcafeterias">
                        <button className=" btn btn-outline-dark">
                          View cafeteria's
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to="/updateadmin">
                        <button
                          className=" btn btn-outline-dark"
                          onClick={() => setData(data, eachData.id)}
                        >
                          Update
                        </button>
                      </Link>

                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleDelete(eachData.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default AdminTable;
