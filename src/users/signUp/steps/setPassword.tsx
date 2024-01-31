import {useState} from 'react';
import { useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import '../../user.css';


type UserData = {
    password:string, 
    confirmPassword:string,
    bool: boolean,
}  
type UseFormProps = UserData & {
    updateFields: (fields: UserData) => void,
  
}
export default function SetPassword({password,confirmPassword, updateFields, bool}: UseFormProps){

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const onSubmit = (data : any) => {
      const {password:password,confirmPassword:confirmPassword} = data;
      bool=true;
      updateFields({ password:password ,confirmPassword:confirmPassword, bool: bool });
     
  }


const handleClickShowPassword = (val: String) => {
    if (val === "1")
        return (event: React.MouseEvent) => { setShowPassword1((show) => !show); }
    if (val === "2")
        return (event: React.MouseEvent) => { setShowPassword2((show) => !show); }

}
const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

   
    // const []
    return(
        <form onSubmit={handleSubmit(onSubmit)} className='formDiv flexColumn'>
                            <FormControl className='password' variant="outlined">
                    {errors.password ? <InputLabel error htmlFor="outlined-error-adornment-password">Password</InputLabel> : <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>}
                    <OutlinedInput
                     error
                        id="outlined-adornment-password"
                        type={showPassword1 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword("1")}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
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

                <FormControl className='password' variant="outlined">
                    {errors.confirmPassword ? <InputLabel error htmlFor="outlined-error-adornment-confirm-password">Confirm Password</InputLabel> : <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>}
                    <OutlinedInput
                    error
                        id="outlined-adornment-confirm-password"
                        type={showPassword2 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword("2")}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                        {...register('confirmPassword', {
                            required: true,
                            validate: (val: string) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do no match";
                                }
                            },
                        })}
                    />
                    {errors.confirmPassword ? <FormHelperText error id="outlined-weight-helper-text">Password does not matched!</FormHelperText> : ""}

                </FormControl>
                <Button className='signInButton buttonFilled' variant='contained' type='submit'>Ok</Button>
        </form>
    )
}