import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../routing/Auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.css';

type Head = {
    head: string
}
function Header({ head }: Head) {

    const value = useContext(AuthContext);
    const auth = value?.auth;
    console.log(value);
    const navigate = useNavigate();
    const loc = useLocation();
    console.log(loc);
    const handleLogout = () => {
        value?.setAuth({
            userId: "",
            getAuth: false
        });
        navigate('/');

    }
    const handleRoleBack = () => {
        value?.setAuth({
            userId: "4",
            getAuth: true
        });
        navigate('/role', { state:{from: loc.state.from, data: loc.state.data} });
    }

    return (
        <div className='commonNavBar flexRow'>
            <div className='navLogoContainer'>
                <p className='navLogo'>
                    {/* <FastfoodIcon className='navLogoIcon' /> */}
                    <img className='navLogoIcon' src='images/logoLight.png'></img>
                     HotBites
                </p>
            </div>
            <div className='componenetsNavBar flexRow'>
                <div className='flexRow accountDiv'>
                   {loc.pathname!=="/role" && <AccountCircleIcon className='account' />}
                    <h5 className='account'>{head}</h5>
                </div>
                {auth?.userId !== "5" && (loc.state.from=== "/role" && (<Button className='logout' onClick={handleRoleBack} >Roles</Button>))}
                <Button className='logout' onClick={handleLogout} >Logout <LogoutIcon /></Button>
            </div>
        </div>
    );
}

export default Header;
