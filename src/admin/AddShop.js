import React, { useState } from "react";
import "./Style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";
const AddShop = () => {
  const history = useNavigate();
  const [shop_name, setShopName] = useState("");
  const [description, setDescription] = useState("");

  const [vendor_phone, setVendorPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [cafetaria, setCafeteria] = useState("");
  const loc = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const onSubmit=(d)=>{
  //   console.log(d);
  //   addVendor();

  // }
  const [open, setOpen] = React.useState(false);
  const onSubmit = (d) => {
    console.log(d);
    //addVendor();
    handleClickOpen();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addShop = async (e) => {
    // e.preventDefault();

    await axios
      .post("http://localhost:8080/shops/add", {
        shopName: shop_name,
        phoneNumber: vendor_phone,
        cafeteriaName: cafetaria,
        shopDescription: description,
        address: address,
        phone: phone,
      })
      .then((res) => {
        console.log(res.data);
        //alert();
      });
    history("/admin", { state: { from: loc.state.from } });
  };

  return (
    <div>
      {/* <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>Add Shop</h1>
       
      </div> */}
      <h1>Add Shop</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="text"
                id="shopName"
                className=" form-control mb-4"
                placeholder="Shop Name"
                onChange={(e) => setShopName(e.target.value)}
                required
                // {...register("shopName",{required:true})}
              />
              {/* <p className="text-danger">{errors.shopName?.type==="required" && "shop name is required"}</p> */}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-4"
                id="shopDescription"
                placeholder="Shop Description"
                onChange={(e) => setDescription(e.target.value)}
                // {...register("shopDescription",{required:true})}
                required
              />
              {/* <p className="text-danger">{errors.shopDescription?.type==="required" && "description is required"}</p> */}
            </div>

            <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                id="phoneNumber"
                placeholder="phone number"
                onChange={(e) => setVendorPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
                // {...register("phoneNumber",{required:true,pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,})}
              />
              {/* <span className="text-danger">{errors.phoneNumber?.type==="required" && "Phone is required"}</span>
                            <span className="text-danger">{errors.phoneNumber?.type==="pattern" && "Enter valid phone number"}</span> */}
            </div>
          </div>
          <div className="sub-entry">
            <div className="form-group">
              <select
                id="cafeteriaName"
                className="form-control custom-select custom-select-lg mb-4"
                onChange={(e) => setCafeteria(e.target.value)}
                // {...register("cafeteriaName",{required:true})}
                required
              >
                <option value="" disabled selected hidden>
                  Select a Cafeteria
                </option>
                <option value="cafe1">cafe1</option>
                <option value="cafe2">cafe2</option>
                {/* <option value="Benguluru tower4 cafe">
                  Benguluru tower4 cafe
                </option>
                <option value="Chennai common cafe">Chennai common cafe</option>
                <option value="Chennai Tower7 groundfloor">
                  Chennai Tower7 groundfloor{" "}
                </option>
                <option value="Noida-126 Cafe">Noida-126 Cafe</option> */}
              </select>
              {/* <p className="text-danger">{errors.cafeteriaName?.type==="required" && "description is required"}</p> */}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="address"
                className="form-control  mb-4"
                placeholder=" Shop Address"
                onChange={(e) => setAddress(e.target.value)}
                // {...register("address",{required:true})}
                required
              />
              {/* <p className="text-danger">{errors.address?.type==="required" && "description is required"}</p> */}
            </div>
            <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                id="phone"
                placeholder="Vendor's phone number"
                //value={localStorage.getItem("Phone")}
                onChange={(e) => setPhone(e.target.value)}
                required
                // disabled
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
                // {...register("phone",{required:true,pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,})}
              />
              {/* <span className="text-danger">{errors.phone?.type==="required" && "Phone is required"}</span>
                            <span className="text-danger">{errors.phone?.type==="pattern" && "Enter valid phone number"}</span> */}
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-dark next">
              Submit
            </button>
            {/* <Link to="/add"> */}
            <button
              onClick={() =>
                history("/add", { state: { from: loc.state.from } })
              }
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
              {"Are you sure to add a shop?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Shop will be added to the vendor...
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addShop} autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
