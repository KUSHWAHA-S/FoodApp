import React, { useState, useEffect } from "react";
import "./Style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
//import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddVendor = () => {
  const history = useNavigate();
  const [vendor_name, setVendorName] = useState("");
  const [vendor_email, setVendorEmail] = useState("");
  const [vendor_phone, setVendorPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const loc = useLocation();
  console.log(loc);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (d) => {
    console.log(d);
    //addVendor();
    handleClickOpen();
  };
  const addVendor = async (e) => {
    e.preventDefault();

    //url="https://64365a168205915d34f1423b.mockapi.io/alan"
    // swal("hello");
    //const x=window.confirm("Are you sure to proceed next");
    //if(x){
    await axios
      .post("http://localhost:8080/user", {
        name: vendor_name,

        email: vendor_email,
        phone: vendor_phone,

        password: password,
        address: address,
        roles: ["Vendor"],
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("Phone", vendor_phone);
      });
    history("/addshop", { state: { from: loc.state.from } });
    // }
    // else{
    //   e.preventDefault();
    // }
  };

  return (
    <div>
      {/* <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>Add Vendor</h1>
        
      </div> */}
      <h1>Add Vendor</h1>

      <div className="form-container">
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="sub-entry">
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="form-control"
                  id="name"
                  placeholder="Vendor Name"
                  onChange={(e) => setVendorName(e.target.value)}
                />
                <span className="text-danger">
                  {errors.name?.type === "required" && "Name is required"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                className="mb-3 form-control"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                })}
                placeholder="Vendor's email"
                onChange={(e) => setVendorEmail(e.target.value)}
                //title="Format:characters@characters.domain"
              />

              <span className="text-danger">
                {errors.email?.type === "required" && "Email is required"}
              </span>
              <span className="text-danger">
                {errors.email?.type === "pattern" && "Enter Valid email"}
              </span>
            </div>

            <div className="form-group">
              <input
                type="tel"
                className="mb-2 form-control"
                id="phone"
                {...register("phone", {
                  required: true,
                  pattern:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                })}
                placeholder="Vendor's phone number"
                onChange={(e) => setVendorPhone(e.target.value)}

                // pattern="[0-9]{10}"
                // title="Phone number must be 10 digits"
              />

              <span className="text-danger">
                {errors.phone?.type === "required" && "Phone is required"}
              </span>
              <span className="text-danger">
                {errors.phone?.type === "pattern" && "Enter valid phone number"}
              </span>
            </div>
          </div>
          <div className="sub-entry">
            <div className="form-group ">
              <input
                type="text"
                className=" mb-2 form-control"
                id="address"
                {...register("address", { required: true })}
                placeholder=" Vendor Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="text-danger">
                {errors.address?.type === "required" && "Address is required"}
              </span>
            </div>

            <div className="form-group">
              <input
                type="password"
                className=" mb-2 form-control"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 3,
                  maxLength: 10,
                })}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}

                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                //title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
              <span className="text-danger">
                {errors.password?.type === "required" && "Password is required"}
              </span>
              <span className="text-danger">
                {errors.password?.type === "minLength" &&
                  "Password should be min of 3 digits "}
              </span>
              <span className="text-danger">
                {errors.password?.type === "maxLength" &&
                  "Password should be max of 10 digits "}
              </span>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-dark next">
              Next
            </button>
            {/* <Link to={{pathname:"/admin", state:{from: loc.state.from}}}> */}
            <button
              onClick={() => {
                history("/admin", { state: { from: loc.state.from } });
              }}
              className="btn btn-dark cancel"
            >
              Cancel
            </button>
            {/* </Link> */}
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to add vendor and proceed next?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After adding vendor , you can easily add shop to vendor by the
                registered phone number of vendor
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addVendor} autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
      {/* <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> */}
    </div>
  );
};

export default AddVendor;
