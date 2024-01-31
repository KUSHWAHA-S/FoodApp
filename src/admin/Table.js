import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import ShopTable from "./ShopTable";
import ViewShops from "./ViewShops";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";

const setData = (data, id1,address,phone,email,name,password) => {
  localStorage.setItem("ID1",id1);
  localStorage.setItem("VendorName", name);
  localStorage.setItem("VendorEmail", email);
  localStorage.setItem("VendorPhone",phone); 
  localStorage.setItem("Password", password);
  localStorage.setItem("Address", address);
  console.log(localStorage.getItem("ID1"));
 
};
const handleView=(id,userPhone) =>{
   console.log(id);
   localStorage.setItem("UserId",id);
   localStorage.setItem("UserPhone",userPhone);
   console.log(localStorage.getItem("UserId"));
}

const Table = ({ data, isLoading }) => {

  const [open, setOpen] = React.useState(false);
  const navigate= useNavigate();
  const loc = useLocation();
console.log(loc);
  const handleClickOpen = (id) => {
    localStorage.setItem("DeleteId",id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete(id) {
    axios

      .delete(`http://localhost:8080/user/delete/${localStorage.getItem("DeleteId")}`)

      .then(() => {
        //  getData();
        // window.location.reload(true);
      });
      navigate("/admin", { state: { from: loc.state.from } });
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
              <th scope="col">Vendor Name</th>

              <th scope="col"> Email</th>
              <th scope="col">Phone number</th>

              <th scope="col">Address</th>
              <th scope="col">Shops</th>
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
                      {/* <Link to={"/viewshops"}> */}

                        <button className=" btn btn-outline-dark"
                           onClick={()=>{ handleView(eachData.userId,eachData.phone); navigate('/viewshops',{state:{from: loc.state.from}})} }
                          >
                          View shops
                        </button>
                      {/* </Link> */}
                    </td>
                    <td>
                      {/* <Link to="/update"> */}
                        <button
                          className=" btn" title="Edit"
                         onClick={() =>{ setData(data, eachData.userId,eachData.address,eachData.phone,eachData.email,eachData.name,eachData.password) 
                          navigate('/update',{state:{from: loc.state.from}})}}
                        >
                          <ModeEditIcon/>
                         
                        </button>
                      {/* </Link> */}

                      <button
                        className="btn" title="Delete"
                        onClick={() => handleClickOpen(eachData.userId)}
                      >
                        <DeleteIcon/>
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
          {"Are you sure to delete vendor?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             By deleting vendor,it will also delete the related shops..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
              </>
            );
          })}
        </table>
        {/* <Link to={{pathname:"/admin", state:{from: loc.state.from}}} > */}
          <button onClick={()=>navigate("/admin",{ state:{from: loc.state.from}})} className="btn btn-dark cancel">Cancel</button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Table;
