import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routing/Auth';
import vendorImage from '../../asset/vendor.png';
import customerImage from '../../asset/customer.png';
import adminImage from '../../asset/admin.png';
import Button from '@mui/material/Button';
import './Role.css';




function Role() {

    const navigate= useNavigate();
    const loc = useLocation();
    console.log(loc.state);
    const roleArray=loc.state.data;
    // const [roleArray, setRoleArray] = useState(loc.state);
    // const role ="";
    const value = useContext(AuthContext);
    console.log(value);

    const handleNavigation=(role: string)=>{
        if(role==="Admin"){
            value?.setAuth({
                   userId: "1",
                  getAuth: true
                });
                navigate('/admin', {state: {from:'/role', data:roleArray}});
        }
        else if(role==="Vendor"){
            value?.setAuth({
                   userId: "2",
                  getAuth: true
                });
                navigate("/vendorHomePage", {state: {from:'/role', data:roleArray, vendorId: loc.state.vendorId}});
        }
        else if(role==="Customer"){
            value?.setAuth({
                   userId: "3",
                  getAuth: true
                });
                navigate("/customerLocation", {state: {from:'/role', data:roleArray}});
        }

        
    }

    return (
        <div className='rolePage'>
            {/* <div className='logoSignInDiv'>
                <p className='logoRole'>HotBites</p>
                <img className='logoSignIn' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbE6ll50zqatUdI73xnah210-d33OA6tN_Gg_AewMr_TD2KrxB1hm5wanrgFBzLKuR-Y&usqp=CAU' />
            </div> */}
            <div className='roleContainer'>

                {roleArray.map((i:any) => {
                    const {name , roleId}= i;
                    switch (name) {
                        case "Admin": {
                            // value?.setAuth({
                            //     userId: "1",
                            //     getAuth: true
                            // });
                            return (
                                <div className="flip-card" >
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <img className='roleImage'
                                                src={adminImage}

                                                alt="Avatar" />
                                        </div>
                                        <div className="flip-card-back">
                                            <Button onClick={()=>{handleNavigation("Admin");}} className='signInButton buttonOutlined roleButton' variant="outlined" >ADMIN</Button>
                                        </div>
                                    </div>
                                </div>)
                        }; break;
                        case "Vendor":{
                            // value?.setAuth({
                            //     userId: "2",
                            //     getAuth: true
                            // });
                            return (
                                <div className="flip-card" >
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <img className='roleImage'
                                                src={vendorImage}
                                                alt="Avatar" />
                                        </div>
                                        <div className="flip-card-back">
                                            <Button onClick={()=>{handleNavigation("Vendor");}} className='signInButton buttonOutlined roleButton' variant="outlined" >VENDOR</Button>
                                        </div>
                                    </div>
                                </div>)}; break;
                        case "Customer":{
                            // value?.setAuth({
                            //     userId: "3",
                            //     getAuth: true
                            // });
                            return (<div className="flip-card" >
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img className='roleImage'
                                            src={customerImage}
                                            alt="Avatar" />
                                    </div>
                                    <div className="flip-card-back">
                                        <Button onClick={()=>{handleNavigation("Customer");}} className='signInButton buttonOutlined roleButton' variant="outlined" >CUSTOMER</Button>
                                    </div>
                                </div>
                            </div>)}; break;
                        default: break;
                    }

                })}
            </div>

        </div>

    );

}

export default Role;
