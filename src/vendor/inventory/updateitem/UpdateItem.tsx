import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// import { Theme, useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import HotBites from '../../images/HotBiteslogo.jpg'

import VendorModal from '../vendormodal/VendorModal';

import axios from 'axios';
import { useEffect } from 'react';

import "./UpdateItem.css";

interface Iitem{
  itemId:Number
  itemName:string
  quantity:string
  numOfItem:Number
  itemPrice:Number
  description:string
  foodType:string
  category:string
}

interface ICate{
  categoryId:Number
  categoryName:String
}

const UpdateItem:React.FC=()=>{

  const navigate = useNavigate();
  const loc = useLocation();

  const shopId=loc.state.id
  const shopname = loc.state.shopname
  const itemid = loc.state.itemid

  const [itemName,setItemName]= useState("");
  const [quantity,setQuantity]= useState("")
  const [numberOfItems,setNumberOfItems]= useState(0);
  const [itemPrice,setItemPrice]=useState(0.0)
  const [description,setDescription]= useState("")
  const [foodType,setFoodType]=useState("veg")
  const [category,setCategory]=useState("");

  const [itemNameErr,setItemNameErr]= useState("");
  const [numberOfItemsErr,setNumberOfItemsErr]= useState("");
  const [itemPriceErr,setItemPriceErr]=useState("")
  const [descriptionErr,setDescriptionErr]= useState("")
  const [foodTypeErr,setFoodTypeErr]=useState("")
  const [categoryErr,setCategoryErr]= useState("")

  const [isaddedItem, setisaddedItem] = useState(false)

  const [open, setOpen] = useState(false);

  const [categoriesVal,setCategoriesVal]=useState<ICate[]>([])
  const categoryval=loc.state.initialCategory;
 

  const [itemDetails,setItemDetails]=useState<Iitem>({
    itemId:0,
    itemName:"",
    quantity:"",
    numOfItem:0,
    itemPrice:0.0,
    description:"",
    foodType:"",
    category:"",
});

useEffect(()=>{
  const viewCategories = async() =>{
    try{
      const viewCate = await axios.get<ICate[]>("http://localhost:8080/categories/"+shopId)
      setCategoriesVal(viewCate.data)
    }
    catch(err){
      console.log(err)
    }
    }        
    viewCategories(); 
},[])

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  // PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  // const names = [
  //   'Recommended',
  //   'Masala Dosa',
  //   'Upma',
  //   'Idli'  
  // ];

  // function getStyles(name: string, personName: string[], theme: Theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //     };
  //   }

  //   const theme = useTheme();
  //   const [personName, setPersonName] = useState<string[]>([]);

  //   const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === 'string' ? value.split(',') : value,
  //     );
  //   };

  const itemFieldValidation=()=>{
    if(itemName===""){
      setItemNameErr("itemName is required")
    }
    else{
      setItemNameErr("")
    }

    if(itemPrice===0){
      setItemPriceErr("item price is required")
    }
    else if(itemPrice<0){
      setItemPriceErr("item price can't be negative")
    }
    else{
      setItemPriceErr("")
    }
    
    if(numberOfItems===0){
      setNumberOfItemsErr("number of items is required")
    }
    else if(numberOfItems<0){
      setNumberOfItemsErr("number of item can't be negative")
    }
    else{
      setNumberOfItemsErr("")
    }

    if(description===""){
      setDescriptionErr("description is required")
    }
    else{
      setDescriptionErr("")
    }

    if(category===""){
      setCategoryErr("category is required")
    }
    else{
      setCategoryErr("")
    }

    if(foodType===""){
      setFoodTypeErr("food type is required")
    }
    else{
      setFoodTypeErr("")
    }

  }

  useEffect(()=>{
    if(itemNameErr.length===0 && itemPriceErr.length===0 && numberOfItemsErr.length===0 && descriptionErr.length===0 && foodTypeErr.length===0 && categoryErr.length===0 && isaddedItem===true){
      axios.put("http://localhost:8080/item/update/"+itemid, {
        itemId:itemid,
        itemName:itemName,
        quantity:quantity,
        itemPrice:itemPrice,
        numOfItem:numberOfItems,
        description:description,
        foodType:foodType,
        categoryName:category,
        shopName:shopname,
      },
      {headers: {
        'Content-type': 'application/json'
      }})
      .then(() => {
        setOpen(true)
      });
    }
    setisaddedItem(false)

  },[isaddedItem])


  useEffect(()=>{
    const items = async() =>{
      try{
        const newitems = await axios.get("http://localhost:8080/item/"+itemid)
        const itemdata = newitems.data
        setItemDetails(itemdata)
      }
      catch(err){
        console.log(err)
      }
      
    } 
    items();   
  },[])


  const handleSubmit=(e:any)=>{
    e.preventDefault();
    itemFieldValidation();
    setisaddedItem(true) 
  }

  const handleNavigate = () =>{
    navigate('/vendoritem',{state:{from:loc.state.from,shopid:shopId,shopname:shopname,initialCategory:categoryval}})
  }

  const ItemNameChange=(e:any)=>{
    setItemName(e.target.value)
    if(e.target.value===""){
      setItemNameErr("itemName is required")
    }
    else{
      setItemNameErr("")
    }
  }

  const ItemPriceChange=(e:any)=>{
    setItemPrice(e.target.value)
    if(e.target.value===""){
      setItemPriceErr("item price is required")
    }
    else if(e.target.value<0){
      setItemPriceErr("item price can't be negative")
    }
    else if(e.target.value==0){
      setItemPriceErr("item price can't be zero")
    }
    else{
      setItemPriceErr("")
    }
  }

  const numberOfItemChange = (e:any) =>{
    setNumberOfItems(parseInt(e.target.value))
    if(e.target.value===""){
      setNumberOfItemsErr("number of items is required")
    }
    else if(e.target.value==0){
      setNumberOfItemsErr("number of items can't be zero")
    }
    else if(e.target.value<0){
      setNumberOfItemsErr("number of item can't be negative")
    }
    else{
      setNumberOfItemsErr("")
    }
  }

  const quantityChange=(e:any)=>{
    setQuantity(e.target.value)

  }

  const descriptionChange=(e:any)=>{
    setDescription(e.target.value)
    if(e.target.value===""){
      setDescriptionErr("description is required")
    }
    else{
      setDescriptionErr("")
    }
  }

  const categoryChange =(cateValue:string)=>{
    setCategory(cateValue)
    if(cateValue===""){
      setCategoryErr("category is required")
    }
    else{
      setCategoryErr("")
    }
  }

  const handleClose = () =>{
    setOpen(false); 
    navigate('/vendoritem',{state:{from:loc.state.from,shopid:shopId,shopname:shopname,initialCategory:categoryval}})
  } 

    return(

        <div className='update-item-outside-container'>
          <div>
            <div>
            <div className='back-icon-div-update'>
            <Button variant="text" onClick={handleNavigate} className='update-icon-back-list-btn'><ArrowBackIcon/><u>Back to item List</u></Button>
            </div>          
            </div>
            <div className='hotbites-logo-div-update'>
            <p className='hotbite-heading-update'><i><u>HotBites</u></i></p>
            <img src={HotBites} alt='HotBites logo' className='hotbites-image-update'/>
            </div>
          </div>
            

              
            <div className='update-item-container' >

                <form>
                    <h1 className='updateitem-heading'><u>Update Item</u></h1>
                    <div className='item-name-div'>
                    <label className='item-name-label'>Item Name: </label>
                    <div>
                    <TextField
                      className='item-name-textfield'
                      required
                      // label="Required"
                      placeholder={itemDetails.itemName}
                      onChange={ItemNameChange}
                      />
                      <p className='error-message'>{itemNameErr}</p>
                      </div>
                    </div>
                    

                    <div className='quantity-div'>
                    <label className='quantity-label'>Quantity:</label>
                    <TextField
                      className='quantity-textfield'
                      label='Optional'
                      placeholder={itemDetails.quantity}         
                      onChange={quantityChange}
                      />
                    </div>

                    <div className='number-of-item-div-update'>
                    <label className='number-of-item-label-update'>Number of items:</label>
                    <div>
                    <TextField
                      className='number-of-item-textfield-update'
                      required
                      // label="Required"
                      placeholder={`${itemDetails.numOfItem}`}                
                      onChange={numberOfItemChange}
                      />
                      <p className='error-message'>{numberOfItemsErr}</p>
                      </div>
                    </div>
                    

                    <div className='item-price-div'>
                    <label className='item-price-label'>Item Price:</label>
                    <div>
                    <TextField
                      className='item-price-textfield'
                      required
                      // label="Required"
                      placeholder={`${itemDetails.itemPrice}`}   
                      onChange={ItemPriceChange}
                      />
                      <p className='error-message'>{itemPriceErr}</p>
                      </div>
                    </div>
                    

                    <div className='description-div'>
                    <label className='description-label'>Description:</label>
                    <div>
                    <TextField
                      className='description-textfield'
                      required
                      id="outlined-multiline-flexible"
                      // label="Required"
                      value={description}
                      multiline
                      maxRows={4}
                      placeholder={itemDetails.description}
                      onChange={descriptionChange}
                      />
                      <p className='error-message'>{descriptionErr}</p>
                      </div>
                    </div>
                    

                    <div className='update-category-div'>
                    <label className='update-category-label'>Category:</label>
                    <div>
                    <Box sx={{ minWidth: 220 }} className="category-dropdown-add">
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"  
                      value={category}
                      onChange={(e:any)=>{categoryChange(e.target.value)}}           
                    >
                      {categoriesVal.map((cat)=>{
                        return(
                          <MenuItem  key={`${cat.categoryId}`} value={`${cat.categoryName}`}>{cat.categoryName}</MenuItem>
                        )
                      })}                   
                    </Select>
                    </FormControl>
                    </Box>
                      <p className='error-message'>{categoryErr}</p>
                      </div>
                    </div>
                    
                     
                    <div className='food-type-div'>
                    <label className='food-type-label'>Food type:</label>
                    <div className='update-radio-btn'>
                    <FormControl>             
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="veg"
                    name="row-radio-buttons-group"
                    onChange={(e)=>setFoodType(e.target.value)}
                    >
                    <FormControlLabel value="veg" control={<Radio />} label="veg" />
                    <FormControlLabel value="non-veg" control={<Radio />} label="non-veg" />
                    </RadioGroup>
                    </FormControl>
                    </div>                
                    </div>
                    
                    {/* <div className='category-div'>
                    <label className='category-label'>Category:</label>
                    <FormControl sx={{ m: 1, width: 230 }} className='update-category-dropdown'>
                    <InputLabel id="demo-multiple-name-label">Select Category</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    >
                    {names.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                    >
                    {name}
                    </MenuItem>
                    ))}
                    </Select>
                    </FormControl> 
                    
                    </div> */}

                    <div className='update-item-btn-div'>                   
                    <Button variant="contained" className='update-item-btn' onClick={handleSubmit}>Update Item</Button>
                    </div>
                    
                    
                </form>
                </div>
                <VendorModal op={open} cl={handleClose} message={"item updated Successfully"}/>           
        </div>
    )
}
export default UpdateItem;