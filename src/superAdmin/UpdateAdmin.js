import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminTable from "./AdminTable";

function UpdateAdmin() {
  const history = useNavigate();
  const [vendor_name, setVendorName] = useState("");
  const [vendor_email, setVendorEmail] = useState("");
  const [vendor_phone, setVendorPhone] = useState("");
  const [shop_name, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cafetaria, setCafeteria] = useState("");
  const [description, setDescription] = useState("");
  const [vendor_id, setVendorId] = useState(null);
  const [password, setPassword] = useState("");

  const updateAPIData = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("ID"), vendor_name);
    const x=window.confirm("Are you sure to submit");
   if(x){
    await axios
      .put(`https://64365a168205915d34f1423b.mockapi.io/alan/${vendor_id}`, {
        // id: vendor_id,
        // vendor_name: vendor_name,
        // shop_name: shop_name,
        // vendor_email: vendor_email,
        // vendor_phone: vendor_phone,
        // city: city,
        // cafetaria: cafetaria,
        // description: description,
        // password: password,
        name: vendor_name,

        email: vendor_email,
        phone: vendor_phone,

        password: password,
        address: address,
        roles:["Admin"]
      })
      .then((res) => {
        console.log(res.data);
      });
    history("/viewadmins");}else{
      e.preventDefault();
    }
  };
  

  useEffect(() => {
    setVendorId(localStorage.getItem("ID"));
    setVendorName(localStorage.getItem("VendorName"));
    setVendorEmail(localStorage.getItem("VendorEmail"));
    setVendorPhone(localStorage.getItem("VendorPhone"));
    setShopName(localStorage.getItem("ShopName"));
    setCity(localStorage.getItem("City"));
    setCafeteria(localStorage.getItem("Cafetaria"));
    setDescription(localStorage.getItem("Description"));
    setPassword(localStorage.getItem("Password"));
  }, []);
  return (
    <div>
      <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>UpdateAdmin</h1>
        <Link to="/viewadmins">
          <button className="btn btn-dark bu">Back</button>
        </Link>
      </div>

      <div className="form-container">
        <form className="needs-validation" onSubmit={updateAPIData}>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="text"
                className="mb-4 form-control"
                id="validationCustom01"
                placeholder="Admin Name"
                value={vendor_name}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please Enter your name</div>
            </div>

            <div className="form-group">
              <input
                type="email"
                className=" mb-4 form-control"
                id="vendor_email"
                placeholder="Admin's email"
                value={vendor_email}
                onChange={(e) => setVendorEmail(e.target.value)}
                required
                title="Format:characters@characters.domain"
              />
              {/* <div className="invalid-feedback">
                Please Enter your email correctly
              </div> */}
            </div>
          </div>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                id="vendor_phone"
                placeholder="Admin's phone number"
                value={vendor_phone}
                onChange={(e) => setVendorPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div>
            <div className="form-group ">
              <input
                type="text"
                className=" form-control mb-4"
                placeholder="Admin Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
            </div>

            {/* <div className="form-group">
              <input
                type="password"
                className=" form-control mb-4"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
            </div> */}
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-dark">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAdmin;
