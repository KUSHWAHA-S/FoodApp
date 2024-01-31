import React, { useState, useEffect } from "react";
import "./Style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";




const AddAdmin = () => {
  const history = useNavigate();
  const [admin_name, setAdminName] = useState("");
  const [admin_email, setAdminEmail] = useState("");
  const [admin_phone, setAdminPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  

  const addAdmin = async (e) => {
    e.preventDefault();
    //url="https://64365a168205915d34f1423b.mockapi.io/alan"
    // swal("hello");
    const x=window.confirm("Are you sure to proceed next");
    if(x){await axios
      .post("http://localhost:8080/user", {
        name: admin_name,

        email: admin_email,
        phone: admin_phone,

        password: password,
        address: address,
        roles:["Admin"]
      })
      .then((res) => {
        console.log(res.data);
      });history("/addcafeteria");}
    else{
      e.preventDefault();
    }
  };


  return (
    <div>
      <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>Add Admin</h1>
        <Link to="/superadmin">
          <button className="btn btn-dark bu">Back</button>
        </Link>
      </div>

      <div className="form-container">
        <form className="needs-validation" onSubmit={addAdmin}>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="text"
                className="mb-4 form-control"
                
                placeholder="Admin Name"
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please Enter your name</div>
            </div>

            <div className="form-group">
              <input
                type="email"
                className=" mb-4 form-control"
                placeholder="Admin email"
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                title="Format:characters@characters.domain"
              />
              {/* <div className="invalid-feedback">
                Please Enter your email correctly
              </div> */}
            </div>

            <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                
                placeholder="Admin phone number"
                onChange={(e) => setAdminPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div>
          </div>
          <div className="sub-entry">
            <div className="form-group ">
              <input
                type="text"
                className=" form-control mb-4"
                placeholder=" Admin Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className=" form-control mb-4"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-dark">
              Next
            </button>
          </div>
        </form>
      </div>
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    </div>
  );
};

export default AddAdmin;
