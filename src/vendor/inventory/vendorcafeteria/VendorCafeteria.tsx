

import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

interface Iloc{
    locationId:number
    name:string
    address:string
}

interface ICaf{
    cafeteriaId:number
    name:string
    address:string
    username:string
    status:string 
    location:string

}

const VendorCafeteria=()=>{

    const [location, setLocation] = useState<Iloc[]>([]);
    const [cafe, setCafeteria] = useState<ICaf[]>([
        {cafeteriaId:0,
        name:"",
        address:"",
        username:"",
        status:"", 
        location:""}
    ]);
    const [response, setResponse] = useState('');
    const [locName,setLocationName] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8080/location").then(
            (res)=>{
                setLocation(res.data)
                console.log(res.data)
            }

        )

    },[])

    useEffect(()=>{ 
        if(locName!==""){
            axios.get("http://localhost:8080/cafe/"+locName,
            {headers: {
                'Content-type': 'application/json'
              }}).then(
                (res)=>{
                    setCafeteria(res.data)
                    
            })
        }       
        

    },[locName])

    const handleSubmit =(e:any) =>{
        e.preventDefault()
        navigate('/vendorviewshops',{state:{resp:response}})

    }

    const handleChangeLocation = (loc:string) =>{
        setLocationName(loc);
       
    }

    const handleChangeCafeteria = (caf:string) =>{
        setResponse(caf)
    }


    return(
        <div>
            <div>
            <h3 className='hotBites'><b>HotBites</b></h3>
            <div className='locDiv'>
            <h3>Select Your City and Cafeteria</h3>
            <FormControl sx={{ minWidth: 400 }}>
            <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
            
            
            <Select
                className='loc-select'
                label="City"
                onChange={(e:any)=>handleChangeLocation(e.target.value)}
                >  
                {location.map((loc) => { 
                    return (            
                       <MenuItem key={loc.locationId} value={loc.name}>{loc.name}</MenuItem>
                       );
                    })}
                
            </Select>
           

            </FormControl>


            {locName==="" ? <FormControl sx={{ minWidth: 400 }} disabled>
         {/* <InputLabel id="demo-simple-select-helper-label">Cafeteria</InputLabel> */}
            </FormControl>
            : <FormControl sx={{ minWidth: 400 }}>
            <InputLabel id="demo-simple-select-helper-label">Cafeteria</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"             
              label="Cafeteria"
              onChange={(e:any)=>{handleChangeCafeteria(e.target.value)}}
>
              {cafe.length>0 && cafe.map((caf) => {
              return (
              <MenuItem value={caf.name} key={caf.cafeteriaId}>{caf.name}</MenuItem>
              );
              })}

              </Select>
              </FormControl>}
              <Button variant="contained"
              onClick={handleSubmit}
              >Proceed</Button>


            </div>
            </div>

        </div>

    )
}
export default VendorCafeteria;