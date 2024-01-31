import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useMultiStepForm from "./steps/MultiStepForm";
import SetName from './steps/setName';
import axios from 'axios';
import SetEmail from './steps/setEmail';
import SetPassword from './steps/setPassword';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Button from '@mui/material/Button';
import '../user.css';
// import { spawn } from 'child_process';

const Initial_Data = {
    userName: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",
    bool: false
}
type FormData = {
    userName: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    bool: boolean
}
type navigation = {
    flag: boolean,
}
type UseNavigateProps = {
    updateFlag: (fields: navigation) => void
}
function Registration({ updateFlag }: UseNavigateProps) {
    const [data, setData] = useState(Initial_Data);
    const navigate = useNavigate();

    function updateFields(fields: Partial<FormData>) {

        setData(prev => {
            return { ...prev, ...fields }
        });
        console.log(data);
        // data.bool=false;
    }
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, next, back } = useMultiStepForm(
        [<SetName {...data} updateFields={updateFields} />,
        <SetEmail {...data} updateFields={updateFields} />,
        <SetPassword {...data} updateFields={updateFields} />
        ]);

    const handlePost = () => {

        try {
            // 👇️ const data: CreateUserResponse
            axios.post(
                'http://localhost:8080/user',
                {
                    name: data.userName,

                    email: data.email,
                    phone: data.phone,

                    password: data.password,
                    address: "",
                    roles: ["Customer"]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            ).then((response) => {
                console.log(response);
                alert("successfully created account");

            }).catch(error => {
                console.log(error.message);
                if (error.message === 'Network Error') {
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
        console.log(data);
        updateFlag({ flag: false });
        navigate('/signup');

    }

    { console.log(data); }


    return (
        <div className='formDiv flexColumn'>
            <span>Create Account</span>
            {/* <p>{currentStepIndex + 1} of {steps.length}</p> */}
            {step}
            <div className='nextButtonDiv'>
                {!isFirstStep ?
                    <KeyboardDoubleArrowLeftIcon className='nextButton' onClick={() => { back(); data.bool = false; }} />
                    : <span></span>}
                {data.bool ?
                    !isLastStep ?
                        <KeyboardDoubleArrowRightIcon className='nextButton' onClick={() => { next(); data.bool = false; }} /> :
                        <Button className='nextButton' onClick={() => { handlePost(); data.bool = false; }} >Finish</Button> : <span></span>}
            </div>
        </div>

    );

}

export default Registration;