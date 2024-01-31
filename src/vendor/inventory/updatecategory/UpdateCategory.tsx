import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation,useNavigate } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './UpdateCategory.css'

import VendorModal from '../vendormodal/VendorModal';

const UpdateCategory = () =>{

    const loc = useLocation()
    const categoryId = loc.state.categoryId
    const categoryName = loc.state.categoryName
    const shopId = loc.state.shopId
    const shopName=loc.state.shopname
    const categoryval=loc.state.initialCategory;

    const [open, setOpen] = useState(false);
    const navigate=useNavigate()

    const [updateCategoryName,setUpdateCategoryName]=useState("")

    const handleUpdateCategory = (e:any) =>{
        e.preventDefault()
        axios.put("http://localhost:8080/category/update/"+categoryId, {
            categoryId:categoryId,
            categoryName:updateCategoryName,
            shopId:shopId
            
          },
          {headers: {
            'Content-type': 'application/json'
          }})
          .then(()=>{
            console.log("category updated successfully")
            setOpen(true)
          }
          )

    }

    const handleClose = () =>{
        setOpen(false); 
        navigate('/addcategory',{state:{shopId:shopId,shopname:shopName,initialCategory:categoryval}})
    } 

    const handleUpdateCategoryBack =()=>{
        navigate('/addcategory',{state:{shopId:shopId,shopname:shopName,initialCategory:categoryval}})
    }

    return(
        <div className='update-cat-category-outer-div'>
            <div className='back-icon-category-div' >
            <Button variant="text" onClick={handleUpdateCategoryBack} className='back-to-itemlist-btn-category'><ArrowBackIcon/><u>Back to category list</u></Button>
            </div> 
            <div  className='update-cat-category-div'>
            <div><h2><u>Update Category</u></h2></div>
            <div className='update-cat-category-text'>
            <TextField  variant="outlined" placeholder={categoryName} onChange={(e:any)=>setUpdateCategoryName(e.target.value)}/>
            </div>
            <div className='update-cat-category-btn'>
            <Button variant="contained" onClick={handleUpdateCategory}>Update Category</Button>
            </div>

            </div>
            <VendorModal op={open} cl={handleClose} message={"category updated Successfully"}/>
        </div>
    )
}
export default UpdateCategory;