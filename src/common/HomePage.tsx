import React from "react";
import "./HomePage.css";
import { Button, Paper } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { Link } from "react-router-dom";
import FastfoodIcon from '@mui/icons-material/Fastfood';

function HomePage() {

  
  const items = [
    {
      name: 'background1 homePage',
      description: 'Where there is good food, there is happiness :)',
    },
    {
      name: 'background2 homePage',
      description: 'Oh, did you say exercise?  I  thought you said extra fries!',
    },
    {
      name: 'background3 homePage',
      description: 'A day is best started on a full stomach...',
    },
  ];


  const Item = ({ name, description }) => {
    return (
      <div className={name}>
        <div className="homePageSubDiv">
          <p className='homePageLogo'>
            {/* <FastfoodIcon className='navLogoIcon' /> */}
            <img className='navLogoIcon' src='images/logoLight.png'></img>
             HotBites
          </p>
          <div className="homePageContent">
            <p className="quotes">{description}</p>
            <Link to='/signup'><Button className='signInButton homePageButtonOutlined' variant="outlined">LOGIN / SIGNUP</Button></Link>

          </div>

        </div>

      </div>
    );
  };


  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </Carousel>

  );
}

export default HomePage;
