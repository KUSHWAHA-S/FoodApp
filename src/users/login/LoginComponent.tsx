import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, useNavigate} from 'react-router-dom';
// import {useRouterHistory} from 'react-router';
import {createBrowserHistory} from 'history';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../routing/Auth';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../user.css';

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref,
// ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function LoginComponent() {

    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState([]);
    const [responseMsg, setResponseMsg] = useState();
    const [open, setOpen] = useState(false);
    const [vendorId, setVendorId]= useState();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const value = useContext(AuthContext);
    // console.log(navigate);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const onSubmit = (data: any) => {
        console.log(data)
        if (data.userName === "superadmin" && data.password === "superadmin") {
            value?.setAuth({
                userId: "5",
                getAuth: true
            });
            navigate('/superadmin');
        }
        else {
            // value?.setAuth({
            //     userId: "4",
            //     getAuth: true
            // });
            // navigate('/role', { state: ["Admin", "Vendor", "Customer"] });

            // console.log(role);
            try {
                // 👇️ const data: CreateUserResponse
                axios.post(
                    'http://localhost:8080/user/login',
                    { email: data.userName, password: data.password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    },
                ).then((response) => {
                    console.log(response);
                    setRole(response.data.listRole);
                    setVendorId(response.data.id);
                    setResponseMsg(response.data.msg);

                }).catch(error => {
                    console.log(error.response);
                    
                    if(error.response.status === 404){
                        setResponseMsg(error.response.data.msg);
                        setOpen(true);
                    }
                    // else if()
                    
                    if (error.message === 'Network Error') {
                        setResponseMsg(error.message);
                        setOpen(true);
                        alert("Something went Wrong. Please login again.");
                        // <Modal  />
                    }
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    // 👇️ error: AxiosError<any, any>
                    return error.message;
                } else {
                    console.log('unexpected error: ', error);
                    return 'An unexpected error occurred';
                }
            }
        }

    }

    useEffect(() => {

        console.log(role);
        if (role != undefined) {
            if (role.length > 1) {
                value?.setAuth({
                    userId: "4",
                    getAuth: true
                });

                navigate('/role', { state: { from : "/role",data:role,vendorId:vendorId } });
            }


            else if (role.length == 1) {
                const { roleId: roleId, name: name } = role[0];
                console.log(roleId);
                switch (roleId) {
                    case 3: {
                        value?.setAuth({
                            userId: "3",
                            getAuth: true
                        });
                        navigate("/customerLocation",{replace:true,state: {from: '/signup'}})
                    }; break;
                    case 1: {
                        value?.setAuth({
                            userId: "1",
                            getAuth: true
                        });
                        navigate("/admin", {replace:true,state:{from: '/signup'}})
                    }; break;
                    case 2: {
                        value?.setAuth({
                            userId: "2",
                            getAuth: true
                        });
                        navigate('/vendorHomePage',{replace:true,state:{from: '/signup', vendorId:vendorId}})
                    }; break;

                    default: break;
                }
            }
        }
    }, [role]);



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='formDiv flexColumn '>
            
            <span>Let's  Login!</span>
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {responseMsg}
                </Alert>
            </Snackbar> */}
            
            {errors.userName ?
                <TextField error className='userName' sx={{ minWidth: '27ch' }} id="outlined-error-helper-text" label="*User Name" variant="outlined" {...register('userName', { required: true })} helperText="User Name is required." /> :
                <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="User Name" variant="outlined" {...register('userName', { required: true })} />

            }
            {/* <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="User Name" variant="outlined" onChange={handleUserName} /> */}
            <FormControl className='password' variant="outlined">
                {errors.password ? <InputLabel error htmlFor="outlined-error-adornment-password">*Password</InputLabel> : <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>}
                <OutlinedInput
                    error
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    {...register('password', {
                        required: true,
                        validate: (val: string) => {
                            if (val.length < 8) {
                                console.log(watch('password'));
                                return "Password should be of length 8 or above.";
                            }
                        },
                    })}
                />
                {errors.password ? <FormHelperText error id="outlined-weight-helper-text">Password should be of length 8 or above.</FormHelperText> : ""}
            </FormControl>
            {open=== true && <Alert className='loginAlert' onClose={handleClose} severity="error" >
                    {responseMsg}
                </Alert>}

            <Button type='submit' className='signInButton buttonFilled' variant='contained' >SIGN IN</Button>

            {/* <p className='SignUpFlip' onClick={handleCss}>SIGN UP</p> */}

        </form>
    );
}

export default LoginComponent;



{/* <div className='loginPage'>
            <div
                // className='circularDiv transitions b'
                className={bool ? 'rectangularDiv transitions ' : 'rectangularDiv transitions b'}
            >
                <div>
                <h3>Welcome Back!</h3>
        <p>To keep connected with us please login with your personal info.</p>
                </div>
                <div className='formDiv front'>
                    <span>Member Login</span>
                    <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="User Name" variant="outlined" onChange={handleUserName} />
                    <FormControl className='password' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={handlePassword}
                        />
                    </FormControl>
                    
                    <Button className='signInButton' variant='contained' >LogIn</Button>

                    <p className='SignUpFlip' onClick={handleCss}>SIGN UP</p>

                </div>

                <div className='back'>efeefce
                    <button onClick={handleCssClose}>gfd</button>
                    <p className='SignUpFlip' onClick={handleCssClose}>SIGN IN</p>
                </div>
                //  <div className='loginButton'>Login</div> 
            </div>


        </div> */}
