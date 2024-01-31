import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import '../user.css';
import LoginComponent from './LoginComponent';
import Registration from '../signUp/Registration';

type navigation = {
  flag: boolean,
}

function Login() {
  const [flag, setFlag] = useState(true);
  const [style, setStyle] = useState("loginDiv flexRow");
  const handleCss = () => {
    setFlag(!flag);
    // setStyle("loginDiv transitions flexRow");
    // setStyle("loginDiv");
  }
  function updateFlag(fields: navigation) {
    setFlag(!flag)
    // data.bool=false;
  }


  return (
    <div className='loginPage2 flexRow'>
      <div className='logoSignInDiv '>
        <p className='logoSignIn flexRow'>
          {/* <FastfoodIcon className='navLogoIcon'/> */}
          <img className='navLogoIcon' src='images/logonew.png'></img> HotBites</p>
        {/* <img className='logoSignIn'  /> */}
      </div>
      <div className={style}>

        {!flag ? <div className='Div flexColumn'>
          {/* <img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbE6ll50zqatUdI73xnah210-d33OA6tN_Gg_AewMr_TD2KrxB1hm5wanrgFBzLKuR-Y&usqp=CAU' /> */}

          <h2 className='headingLogin'>Welcome Back!</h2>
          <p className='loginPara'>To keep connected with us please login with your personal info.</p>
          <div className='flexColumn buttonParaDiv'>
            <Button className='signInButton buttonOutlined' variant="outlined" onClick={() => { handleCss(); }}>SIGN UP</Button>
            <p className='loginPara'>New here?  Sign Up!</p>
          </div>

        </div> :
          <div className='Div flexColumn'>
            {/* <img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbE6ll50zqatUdI73xnah210-d33OA6tN_Gg_AewMr_TD2KrxB1hm5wanrgFBzLKuR-Y&usqp=CAU' /> */}

            <h2 className='headingLogin'>Hungry ..?</h2>
            <p className='loginPara'>We would love to be in touch with you! SignUp to have great taste experience.</p>
            <div className='flexColumn buttonParaDiv'>
              <Button className='signInButton buttonOutlined' variant="outlined" onClick={() => { handleCss(); }}>LOGIN</Button>
              <p className='loginPara'>Already a memeber? LogIn!</p>
            </div>
          </div>
        }
        <div className='div2 flexColumn'>
          {!flag ? <LoginComponent /> : <Registration updateFlag={updateFlag} />}
        </div>
      </div>

    </div>
  );
}

export default Login;
