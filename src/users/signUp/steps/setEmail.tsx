import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import '../../user.css';

type UserData = {
    email: string,
    phone: string,
    bool: boolean,
}

type UseFormProps = UserData & {
    updateFields: (fields: UserData) => void
}


export default function SetEmail({ email, phone, updateFields, bool }: UseFormProps) {

    // bool=false;
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();

    const onSubmit = (data: any) => {
        const { email: email, phone: phone } = data;
        bool = true;
        updateFields({ email: email, phone: phone, bool: bool });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='formDiv flexColumn'>

            {errors.email ?
                <TextField error className='userName' sx={{ minWidth: '27ch' }} id="outlined-error-helper-text" label="Email" variant="outlined"

                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                    helperText="Enter valid email address."
                /> :
                <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="Email" variant="outlined"
                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                />

            }
            {errors.phone ?
                <TextField error className='userName' sx={{ minWidth: '27ch' }} id="outlined-error-helper-text" label="Phone" variant="outlined"
                    {...register('phone', { required: true, pattern: /^\d{10}$/ })}
                    helperText="Enter valid phone number."
                /> :
                <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="Phone" variant="outlined"
                    {...register('phone', { required: true, pattern: /^\d{10}$/ })}
                />

            }
            <Button className='signInButton buttonFilled' variant='contained' type='submit'>Ok</Button>

            {/* {error.email ?
            <TextField error className='userName' sx={{ minWidth: '27ch' }} id="outlined-error-helper-text" label="Email" variant="outlined"

                {...email('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                helperText="Enter valid email address."
            /> :
            <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="Email" variant="outlined"
                {...email('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
            />

        }
        {error.phone ?
                    <TextField error className='userName' sx={{ minWidth: '27ch' }} id="outlined-error-helper-text" label="Phone" variant="outlined"
                        {...phone('phone', { required: true, pattern: /^\d{10}$/ })}
                        helperText="Enter valid phone number."
                    /> :
                    <TextField className='userName' sx={{ minWidth: '27ch' }} id="outlined-basic" label="Phone" variant="outlined"
                        {...phone('phone', { required: true, pattern: /^\d{10}$/ })}
                    />

                } */}

        </form>
    )
}