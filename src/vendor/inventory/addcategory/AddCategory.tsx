import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';
import HotBites from '../../images/HotBiteslogo.jpg'

import { useEffect } from 'react';

import axios from 'axios';

import './AddCategory.css'
import {  useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import VendorModal from '../vendormodal/VendorModal';

interface Icategory{
    categoryId:number,
    categoryName:string,
    shopId:number
}

interface Iitem{
  itemId:Number
  itemName:String
  quantity:String
  numOfItem:Number
  itemPrice:Number
  description:String
  foodType:String
  category:String
}

const AddCategory=()=>{

    const navigate = useNavigate()
    const loc = useLocation()
    const shopId = loc.state.shopId;
    const shopname = loc.state.shopname
    const categoryval=loc.state.initialCategory;

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [deleteCategory,setDeleteCategory] = useState(false)
    const [categoryDelete,setCategoryDelete] = useState(0)

    
    const [categoryAdded,setCategoryAdded] = useState(false)

    const handleCategoryBackToList = () =>{
        navigate('/vendoritem',{state:{from:loc.state.from,shopid:shopId,shopname:shopname,initialCategory:categoryval}})
    }
    const [categoryDetails,setCategoryDetails]=useState<Icategory[]>([])

    const [addCategory,setAddCategory]=useState("")

    const [catErr,setCatErr] = useState("")
    const [start,setStart] = useState(false)

    const [isCategoryAdded,setisCategoryAdded] = useState(false)

    const [messageCate,setMessageCate] = useState("")
    const [deleteCategoryValue,setDeleteCategoryValue]=useState('')
    const [varicatdelete,setVariCatDelete]=useState(false)
    const [allitemsarray,setallitemsarray] = useState<Iitem[]>([])

    const handleClickOpen = (valueDelete:any,deleteValueName:any) => {
        setCategoryDelete(valueDelete)
        setDeleteCategoryValue(deleteValueName)
        setOpen(true);
      };
    
      const handleClose = (event:any) => {
        setOpen(false);
        if (event === "Yes") {
          axios.get<Iitem[]>("http://localhost:8080/items/"+deleteCategoryValue)
          .then((res)=>{
            setallitemsarray(res.data)
            setVariCatDelete(true)
          })
        
        }
      };

      const handleCloseCategoryDelete=()=>{
        setAddCategory("")
        setStart(false)
      }

      useEffect(()=>{
        if(allitemsarray.length===0){
          axios
          .delete("http://localhost:8080/category/delete/"+categoryDelete)
          .then(() => {
            setDeleteCategory(true)
            setMessageCate("category deleted successfully")
            setStart(true)
          });
        }
        else{
          setMessageCate("This category has some item. so you can't delete this item ")
          setStart(true)
        }
        setVariCatDelete(false)

      },[varicatdelete])

    useEffect(()=>{
      if(isCategoryAdded===true && catErr.length===0){
        try{
          axios.post("http://localhost:8080/category/add",{
              categoryName:addCategory,
              shopId:shopId,
          },
          {headers: {
            'Content-type': 'application/json'
          }}).then(()=>{
          setCategoryAdded(true)
          setMessageCate("category added successfully")
          setStart(true)
          });
          } catch (err) {
          console.log(err);
          }
          setisCategoryAdded(false)
      }
    },[isCategoryAdded])


    useEffect(()=>{
        try{
            axios.get("http://localhost:8080/categories/"+shopId).then(
                (res)=>{
                    setCategoryDetails(res.data);

                }
            )
            
          }
          catch(err){
            console.log(err)
          }
          setDeleteCategory(false)
          setCategoryAdded(false)
    },[deleteCategory,categoryAdded])

    const validateCategory=()=>{
      if(addCategory===""){
        setCatErr("category name is required")
      }
    }

    const handleAddCategory=(e:any)=>{
        e.preventDefault();
        validateCategory();
        setisCategoryAdded(true);

    }

    const handleCategoryChange = (categoryVal:any)=>{
      setAddCategory(categoryVal)
      if(categoryVal===""){
        setCatErr("category name is required")
      }
      else{
        setCatErr("")
      }
    }

    const handleUpdateCategory = (categoryId:any,categoryName:any) =>{
      navigate('/updatecategory',{state:{from:loc.state.from,shopId:shopId,categoryId:categoryId,categoryName:categoryName,shopname:shopname,initialCategory:categoryval}})
    }


    return(
        <div>
            <div>
            <div className='category-div'>
            <div className='back-icon-div-category' >
            <Button variant="text" onClick={handleCategoryBackToList} className='back-to-itemlist-btn-category'><ArrowBackIcon/><u>Back to item List</u></Button>
            </div>          
            </div>
            <div className='hotbites-logo-div-category'>
            <p className='hotbite-heading-category'><i><u>HotBites</u></i></p>
            <img src={HotBites} alt='HotBites logo' className='hotbites-image-category'/>
            </div>
            </div>

            <div className='add-category-form-div'>
            <div className='add-category-div'>
                <form>
                <h2 className='add-category-heading'><u>Add Category</u></h2>
                <div className='add-category-btn-div'>  
                <div>                             
                   <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    className='add-category-textfield'
                    value={addCategory}
                    onChange={(e)=>handleCategoryChange(e.target.value)}
                    /> 
                    <p className='category-err-para'>{catErr}</p>
                  </div>                                
                    <Button variant="contained" className='add-category-btn' onClick={handleAddCategory}>add category</Button>
 
            </div>
            
            <div className='category-table-div'>                
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 100}} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                               <TableCell align="center"><b>Category Name</b></TableCell>
                               <TableCell align="center"><b>Update Category</b></TableCell>
                               <TableCell align="center"><b>Delete Category</b></TableCell>
                               
                            </TableRow>
                            </TableHead>
                        {categoryDetails.map((cat)=>{
                        return(
                            <TableBody key={cat.categoryId}>
                                
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                               <TableCell align='center'>{cat.categoryName}</TableCell>
                               <TableCell align="center"><Button variant="contained" onClick={()=>{handleUpdateCategory(`${cat.categoryId}`,`${cat.categoryName}`)}}>update</Button></TableCell>
                               <TableCell align="center"><Button variant="contained" onClick={()=>{handleClickOpen(`${cat.categoryId}`,`${cat.categoryName}`)}}>delete</Button></TableCell>
                               
                               </TableRow>
                               </TableBody>
                                 )
 

                                })}
                            </Table>
                            </TableContainer>
                   
                    </div>
                </form>
                </div>
            </div>
            <div>
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
             {"Delete Category"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
            Do you want to delete this category ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{handleClose("Yes")}} autoFocus>
            Yes
            </Button>
            <Button autoFocus onClick={()=>{handleClose("No")}}>
            No
            </Button>         
            </DialogActions>
            </Dialog>
            </div> 
            <VendorModal op={start} cl={handleCloseCategoryDelete} message={messageCate}/>  
        </div>
    )
}

export default AddCategory;