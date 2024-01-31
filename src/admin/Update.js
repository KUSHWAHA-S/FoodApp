import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Table from "./Table";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";

function Update() {
  const history = useNavigate();
  const [vendor_name, setVendorName] = useState("");
  const [vendor_email, setVendorEmail] = useState("");
  const [vendor_phone, setVendorPhone] = useState("");
  const [address, setAddress] = useState("");
  const [vendor_id, setVendorId] = useState(null);
  const [password, setPassword] = useState("");
  const {register,formState:{errors},handleSubmit} = useForm();
  const [open, setOpen] = React.useState(false);
  const loc = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit=(d)=>{
    console.log(d);
    //addVendor();
    handleClickOpen();

  }
  const updateAPIData = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("ID1"));
    //const x=window.confirm("Are you sure to submit");
  //  if(x){
    await axios
      .put(`http://localhost:8080/user/update/${localStorage.getItem("ID1")}`, {
        userId:localStorage.getItem("ID1"),
        name: vendor_name,
        email: vendor_email,
        phone: vendor_phone,
        password: password,
        address: address,
        roles:["Vendor"]
      })
      .then((res) => {
        console.log(res.data);
      });
    history("/view",{state:{from: loc.state.from}});
  // }else{
  //     e.preventDefault();
  //   }
  };
  

  useEffect(() => {
    setVendorId(localStorage.getItem("ID"));
    setVendorName(localStorage.getItem("VendorName"));
    setVendorEmail(localStorage.getItem("VendorEmail"));
    setVendorPhone(localStorage.getItem("VendorPhone"));
    setPassword(localStorage.getItem("Password"));
    setAddress(localStorage.getItem("Address"))
  }, []);
  return (
    <div>
      {/* <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>UpdateVendor</h1>
        
      </div> */}
       <h1>UpdateVendor</h1>

      <div className="form-container">
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="text"
                className="mb-4 form-control"
                id="validationCustom01"
                placeholder="Vendor Name"
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
                placeholder="Vendor's email"
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
                placeholder="Vendor's phone number"
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
                placeholder=" Vendor Address"
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
            <button type="submit" className="btn btn-dark next">
              submit
            </button>
            {/* <Link to="/view"> */}
          <button onClick={()=> history('/view',{ state:{from: loc.state.from}})} className="btn btn-dark cancel">Cancel</button>
        {/* </Link> */}
          </div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to submit"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateAPIData} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
        </form>
      </div>
    </div>
  );
}

export default Update;
