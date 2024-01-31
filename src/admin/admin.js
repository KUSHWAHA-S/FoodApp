import React, { useContext, useEffect } from "react";
import { AuthContext } from "../routing/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import './Style.css';

const Admin = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    console.log(loc);
    const value = useContext(AuthContext);
    useEffect(() => {
        window.onpopstate = e => {
            value?.setAuth({
                userId: "",
                getAuth: false
            });
            navigate("/");


        }
        console.log(loc);
    }, []);

    // const handleRoleBack = () => {
    //     value?.setAuth({
    //         userId: "4",
    //         getAuth: true
    //     });
    //     navigate('/role', { state: loc.state.data });
    // }

    return (

        <div >
            {/* {loc.state.from === "/role" && <div className="roleBackDiv">
                <div className="roleBackButton" onClick={handleRoleBack}>Role</div>
            </div>} */}
            <h1>Admin Portal</h1>
            <div className="container1">

                <button type="button" className="btn btn-outline-dark" onClick={() => {
                    navigate("/add",{state:{from: loc.state.from}})
                }}>Add Vendor</button><br></br>
                <button type="button" className="btn btn-outline-dark" onClick={() => {
                    navigate("/view",{state:{from:loc.state.from}})
                }}>View Vendors</button>
            </div>
        </div>
    )



}
export default Admin;