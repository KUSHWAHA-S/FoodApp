import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";

const setData = (
  data,
  shop_id,
  shop_name,
  shop_phone,
  description,
  address,
  phone
) => {
  // console.log(data, id1);

  localStorage.setItem("ShopId", shop_id);
  localStorage.setItem("ShopName", shop_name);
  localStorage.setItem("ShopPhone", shop_phone);
  localStorage.setItem("Phone", phone);
  localStorage.setItem("Description", description);
  localStorage.setItem("Address", address);
  console.log(localStorage.getItem("Phone"));
};

const ShopTable = ({ data, isLoading }) => {
  //console.log(data);
  const [open, setOpen] = React.useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const handleClickOpen = (id) => {
    localStorage.setItem("DeleteId", id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete() {
    axios

      .delete(
        `http://localhost:8080/shops/delete/${localStorage.getItem("DeleteId")}`
      )

      .then(() => {
        //  getData();
        // window.location.reload(true);
      });
    navigate("/view", { state: { from: loc.state.from } });
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
              {/* <th scope="col">Vendor Name</th> */}
              <th scope="col">Shop Name</th>
              {/* <th scope="col"> Email</th> */}
              <th scope="col">Phone number</th>
              {/* <th scope="col">Cafeteria</th> */}
              <th scope="col">Description</th>
              {/* <th scope="col">City</th>
              <th scope="col">Cafeteria</th>
              <th scope="col">Description</th> */}
              <th scope="col">Address</th>
              {/* <th scope="col">Shops</th> */}
              <th scope="col">Actions</th>
            </tr>
          </thead>

          {data.map((eachData) => {
            return (
              <>
                <tbody className="">
                  <tr>
                    {/* <th scope="row" key={eachData.shopId}>{eachData.shopId}</th> */}

                    <td>{eachData.shopName}</td>
                    <td>{eachData.phoneNumber}</td>
                    <td>{eachData.shopDescription}</td>
                    <td>{eachData.address}</td>
                    <td>
                      {/* <Link to="/updateshop"> */}
                      <button
                        className=" btn"
                        title="Edit"
                        onClick={() => {
                          setData(
                            data,
                            eachData.shopId,
                            eachData.shopName,
                            eachData.phoneNumber,
                            eachData.shopDescription,
                            eachData.address,
                            eachData.phone
                          );
                          navigate("/updateshop", {
                            state: { from: loc.state.from },
                          });
                        }}
                      >
                        <EditIcon />
                      </button>
                      {/* </Link> */}

                      <button
                        className="btn"
                        title="Delete"
                        onClick={() => handleClickOpen(eachData.shopId)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete shop?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      It will also delete the related items in shop..
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                      <span className="text-danger">OK</span>
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            );
          })}
        </table>
        {/* <Link to="/view"> */}
        <button
          onClick={() => navigate("/view", { state: { from: loc.state.from } })}
          className="btn btn-dark cancel"
        >
          Cancel
        </button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default ShopTable;
