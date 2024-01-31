import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../user.css';


type UserData = {
  userName: string,
  bool: boolean,
}

type UseFormProps = UserData & {
  updateFields: (fields: UserData) => void,

}

export default function SetName({ userName, updateFields, bool }: UseFormProps) {


  const { register, handleSubmit, watch, formState: { errors }, } = useForm();
  const onSubmit = (data: any) => {
    // next();
    const { userName: username } = data;
    bool = true;
    updateFields({ userName: username, bool: bool });
    // bool=false;

  }

  // console.log(userName);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='formDiv flexColumn'>
      {errors.userName ?
        <TextField error className='userName' sx={{ minWidth: '27ch' }} id="outlined-error-helper-text" label="*Your Name" variant="outlined" {...register('userName', { required: true })} helperText="Required Field." /> :
        <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="Your Name" variant="outlined" {...register('userName', { required: true })} />

      }
      <Button className='signInButton buttonFilled' variant='contained' type='submit'>Ok</Button>
    </form>

  );
}