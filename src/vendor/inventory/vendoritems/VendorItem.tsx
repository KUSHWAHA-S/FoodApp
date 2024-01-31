
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import Switch from '@mui/material/Switch';

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import VendorModal from '../vendormodal/VendorModal';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import "./VendorItem.css";
import { useEffect,useState, useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';


import HotBites from '../../images/HotBiteslogo.jpg'


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

interface ICat{
  categoryId:Number
  categoryName:String
}


const VendorItem=()=>{

    const navigate = useNavigate();
    const loc = useLocation();
    console.log(loc);
    const shopId = parseInt(loc.state.shopid)
    const shopName = loc.state.shopname
    let initialCategory=loc.state.initialCategory
    const inputRef = useRef<any>(null)

    const [itemDetails,setitemDetails]=useState<Iitem[]>([]);
    const [searchedItem, setSearchedItem]=useState<Iitem[]>([])
    const [query,setQuery] = useState("")

    const [itemDelete,setItemDelete] = useState(0);

    // const label = { inputProps: { 'aria-label': 'Switch demo' } };   

    const [viewCategory,setViewCategory] = useState<ICat[]>([]);

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [deleteItem,setDeleteItem] = useState(false)
    const [categoryVal,setCategoryVal]=useState(`${initialCategory}`);
    const [start,setStart] = useState(false)
    
    const handleClickOpen = (valueDelete:any,cateVal:any) => {
      setItemDelete(valueDelete)
      setOpen(true);
    };
  
    const handleClose = (event:any) => {
      setOpen(false);
      
      if (event === "Yes") {
        axios
          .delete("http://localhost:8080/item/delete/"+itemDelete)
          .then(() => {
            setDeleteItem(true)
            setStart(true)
          });
      }
    };

    const handlecloseModal =()=>{    
      setStart(false)
    }

    const handleAddItemNavigate = () =>{
      navigate('/additem',{state:{shopId:shopId,shopname:shopName,initialCategory:categoryVal}})
    }

    const handleAddCategoryNavigate =() =>{
      navigate('/addcategory',{state:{shopId:shopId,shopname:shopName,initialCategory:categoryVal}})
    }

    const handleUpdateBtn = (itemId:Number) =>{
      navigate('/updateitem',{state:{id:shopId,itemid:itemId,shopname:shopName,initialCategory:categoryVal}})
    }

   
    useEffect(()=>{

      if(categoryVal!=""){
        const items = async() =>{
        try{
          const newitems = await axios.get<Iitem[]>("http://localhost:8080/items/"+categoryVal)       
          const itemdata = newitems.data
          setitemDetails(itemdata)
          setSearchedItem(itemdata)
        }
        catch(err){
          console.log(err)
        }      
        }
        items(); 
      }
  

      const viewCategories = async() =>{
      try{
        const viewCate = await axios.get<ICat[]>("http://localhost:8080/categories/"+shopId)
        setViewCategory(viewCate.data)
        // setCategoryVal(`${viewCate.data[0].categoryName}`)
      }
      catch(err){
        console.log(err)
      }
      }        
      viewCategories();     
      setDeleteItem(false)               
    },[categoryVal,deleteItem,shopId])

    useEffect(()=>{
      setSearchedItem(itemDetails.filter((item)=>{return(item.itemName.toLowerCase().includes(query))}))
    },[query,itemDetails])  

    

    return(
        <div> 
            {/* <div>
            <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" className='nav-head'>
            <Toolbar>
               <IconButton
               size="large"
               edge="start"
               aria-label="menu"
               sx={{ mr: 2 }}
               >
               <ArrowBackIcon/>
               </IconButton>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                HotBites
               </Typography>
               <Switch {...label} />
               <Button color="inherit">Veg Only</Button>
            </Toolbar>
            </AppBar>
            </Box>
            </div>  */}

            <div>
            <Button variant="contained" className='add-category-vendor-btn' onClick={()=>navigate('/vendorHomePage',{state:{from:loc.state.from,data:loc.state.data, vendorId:loc.state.vendorId}})} >Back</Button>                         

            {/* <div className='hotbites-logo-div-view'>
            <p className='hotbites-heading-view'><i><u>HotBites</u></i></p>
            <img src={HotBites} alt='HotBites logo' className='hotbites-image-view'/>
            </div>   */}
            </div>      

            <div className='search-div'>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,marginLeft:50 }}
              >
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Item .."
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e)=>setQuery(e.target.value)}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
              </IconButton>
            
              <FilterListIcon/>
            </Paper>            
                     
            </div>

            <div className='add-btn-div'>
            <Button variant="contained" className='add-category-vendor-btn' onClick={handleAddCategoryNavigate} >Add category</Button>                         
            <Button variant="contained" className='add-item-vendor-btn' onClick={handleAddItemNavigate}>Add item</Button>

            </div>

            <div className='vendor-category-div'>
            <Box sx={{ width: '100%' }}> 
            <Tabs     
                        textColor="secondary"
                        indicatorColor="secondary"
                        className='tab-category'
                        >
            {viewCategory.map((cat)=>{
            if(cat.categoryName===initialCategory){
              console.log()
            return(  
              <Tab className='tag-css' label={cat.categoryName} onClick={()=>{setCategoryVal(`${cat.categoryName}`)}} autoFocus/>                                                                                                                                  
            )}
            else if(categoryVal===cat.categoryName || cat.categoryName===initialCategory){
              return(
              <Tab className='tag-css' label={cat.categoryName} onClick={()=>{setCategoryVal(`${cat.categoryName}`)}} ref={inputRef} autoFocus/>
              )
            }
            else{
            return(
              <Tab className='tag-css' label={cat.categoryName} onClick={()=>{setCategoryVal(`${cat.categoryName}`)}} ref={inputRef}/>                                                                                                                                  
            )}
            })}
            </Tabs>  
            </Box>  
            
            </div>
            <div className='item-view-div'>
              {searchedItem.length>0?searchedItem.map((item)=>{
                return(<div className='item-list-view-div' key={`${item.itemId}`}>
                      <Card className='card-view'>
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      <u>{item.itemName}</u>
                      </Typography>
                      <div>
                      <div>
                      <div>Description : {item.description}</div>
                      </div>
                      <div className='itemdetails-view-div'>                        
                        <div>Quantity : {item.quantity}</div>
                        <div className='food-type-view'>FoodType : {item.foodType}</div>
                        <div className='number-of-items-view'>Number of Items : {`${item.numOfItem}`}</div>
                      </div>
                      <div className='item-price-view-div'>Item Price : {`${item.itemPrice}`}</div>
                      </div>
                      </CardContent>
                      <CardActions>
                      <Button size="small" className='update-btn-view' onClick={()=>{handleUpdateBtn(item.itemId)}}>update</Button>
                      <Button size="small"className='delete-btn-view' onClick={()=>{handleClickOpen(item.itemId,categoryVal)}}>delete</Button>
                      </CardActions>
                      </Card>
                </div>)
              }):
              <div className='no-item-div'>No Item</div>}       
            </div> 

            <div>
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
             {"Delete Item"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
            Do you want to delete this item ?
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

            <VendorModal op={start} cl={handlecloseModal} message={"item deleted Successfully"}/>              

        </div>
    )

}

export default VendorItem;