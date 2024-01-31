import React from "react";
import './Style.css';
import { useNavigate, useLocation } from "react-router-dom";

const SuperAdmin=()=>{
    const navigate = useNavigate();
    const loc = useLocation();
    console.log(loc);
    // const navigate=useNavigate("");

return(
   
    <div >
       <div className="container">
        <i className="fa fa-user" title="admin"></i>
        <h1>Super Admin Portal</h1>
       </div>
       <div className="container1">
             <button type="button" className="btn btn-outline-dark" onClick={()=>{navigate("/addadmin")
       }}>Add Admin</button><br></br>
             <button type="button" className="btn btn-outline-dark" onClick={()=>{navigate("/viewadmins")
       }}>View Admins</button>  
       </div>
    </div>
)



}
export default SuperAdmin;