 
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import {useEffect} from 'react'

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


import { useState } from 'react';

import VendorModal from '../vendormodal/VendorModal';

import "./AddItem.css";
import axios from 'axios';

interface ICate{
  categoryId:Number
  categoryName:String
}

const AddItem:React.FC=()=>{

  const navigate = useNavigate();

  const [itemName,setItemName]= useState("");
  const [quantity,setQuantity]= useState("")
  const [numberOfItems,setNumberOfItems]= useState("");
  const [itemPrice,setItemPrice]=useState("")
  const [description,setDescription]= useState("")
  const [foodType,setFoodType]=useState("veg")
  const [category,setCategory]= useState("")

  const [itemNameErr,setItemNameErr]= useState("");
  const [numberOfItemsErr,setNumberOfItemsErr]= useState("");
  const [itemPriceErr,setItemPriceErr]=useState("")
  const [descriptionErr,setDescriptionErr]= useState("")
  const [foodTypeErr,setFoodTypeErr]=useState("")
  const [categoryErr,setCategoryErr]= useState("")

  const [isaddedItem, setisaddedItem] = useState(false)

  const [open, setOpen] = useState(false);

  const [categoriesVal,setCategoriesVal]=useState<ICate[]>([])

  const loc = useLocation()
  const shopId = loc.state.shopId;
  const shopname =loc.state.shopname;
  const categoryval=loc.state.initialCategory;

  
  

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

    // const theme = useTheme();
    // const [personName, setPersonName] = useState<string[]>([]);

    // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   setPersonName(
    //     // On autofill we get a stringified value.
    //     typeof value === 'string' ? value.split(',') : value,
    //   );
    // };

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
  
    useEffect(()=>{
      if(itemNameErr.length===0 && itemPriceErr.length===0 && numberOfItemsErr.length===0 && descriptionErr.length===0 && foodTypeErr.length===0 && categoryErr.length===0 && isaddedItem===true){

        try{
          axios.post("http://localhost:8080/item/add",{
            itemName:itemName,
            quantity:quantity,
            itemPrice:parseInt(itemPrice),
            numOfItem:parseFloat(numberOfItems),
            description:description,
            foodType:foodType,
            categoryName:category,
            shopName:shopname,
          },
          {headers: {
            'Content-type': 'application/json'
          }}).then((res)=>{
            setOpen(true)
          });
          } catch (err) {
          console.log(err);
          }
          setisaddedItem(false)
      }

    },[isaddedItem])


    const itemFieldValidation=()=>{
      if(itemName===""){
        setItemNameErr("itemName is required")
      }
      else{
        setItemNameErr("")
      }

      if(itemPrice===""){
        setItemPriceErr("item price is required")
      }
      else if(parseInt(itemPrice)<0){
        setItemPriceErr("item price can't be negative")
      }
      else{
        setItemPriceErr("")
      }
      
      if(numberOfItems===""){
        setNumberOfItemsErr("number of items is required")
      }
      else if(parseInt(numberOfItems)<0){
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

    const handleSubmit=(e:any)=>{
      e.preventDefault();
      itemFieldValidation();
      setisaddedItem(true)
    }

    const handleNavigation=()=>{
      navigate('/vendoritem',{state:{shopid:shopId,shopname:shopname,initialCategory:categoryval}})
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
      setNumberOfItems(e.target.value)
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

    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
    const handleClose = () =>{
      setOpen(false); 
      setItemName("")
      setQuantity("")
      setCategory("")
      setDescription("")
      setNumberOfItems("")
      setFoodType("veg")
      setItemPrice("")
    } 
    
    
    const handleCategoryChange = (cateVal:any) =>{
      setCategory(cateVal)
      if(cateVal===""){
        setCategoryErr("category is required")
      }
      else{
        setCategoryErr("")
      }
    }


    return(
        <div className='add-item-outside-container'>
          <div>
            <div>
            <div className='back-icon-div-add'>
            <Button variant="text" onClick={handleNavigation} className='back-icon-btn'><ArrowBackIcon/><u>Back to item List</u></Button>
            </div>          
            </div>
            <div className='hotbites-logo-div-add'>
            <p className='hotbite-heading-add'><i><u>HotBites</u></i></p>
            <img src={HotBites} alt='HotBites logo' className='hotbites-image-add'/>
            </div>
          </div>
            <div className='add-item-container'>
                <form onSubmit={handleSubmit}>
                    <h1 className='additem-heading'><u>Add Item</u></h1>
                    <div className='item-name-div-add'>
                    <label className='item-name-label-add'>Item Name: </label>
                    <div>
                    <TextField
                      className='item-name-textfield-add'
                      required
                      label="Required"
                      value={itemName}
                      onChange={ItemNameChange}
                      />
                      <p className='error-message'>{itemNameErr}</p>
                      </div>
                    </div>
                    

                    <div className='quantity-div-add'>
                    <label className='quantity-label-add'>Quantity:</label>
                    <div>
                    <TextField
                      className='quantity-textfield-add'
                      label="Optional"
                      value={quantity}
                      onChange={quantityChange}
                      />
                      </div>
                    </div>

                    <div className='number-of-item-div-add'>
                    <label className='number-of-item-label-add'>Number of items:</label>
                    <div>
                    <TextField
                      className='number-of-item-textfield-add'
                      required
                      label="Required"
                      value={numberOfItems}
                      onChange={numberOfItemChange}
                      />
                      <p className='error-message'>{numberOfItemsErr}</p>
                      </div>
                    </div>
                    

                    <div className='item-price-div-add'>
                    <label className='item-price-label-add'>Item Price(in rupees):</label>
                    <div>
                    <TextField
                      className='item-price-textfield-add'
                      required
                      label="Required"
                      value={itemPrice}
                      onChange={ItemPriceChange}
                      />
                      <p className='error-message'>{itemPriceErr}</p>
                      </div>                     
                    </div>
                    
                    <div className='description-div-add'>
                    <label className='description-label-add'>Description:</label>
                    <div>
                    <TextField
                      className='description-textfield-add'
                      required
                      id="outlined-multiline-flexible"
                      label="Required"
                      value={description}
                      multiline
                      maxRows={4}
                      onChange={descriptionChange}
                      />
                      <p className='error-message'>{descriptionErr}</p>
                      </div>
                    </div>
                    

                    <div className='category-div-add'>
                    <label className='category-label-add'>Category:</label>
                    <div>
                    <Box sx={{ minWidth: 220 }} className="category-dropdown-add">
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"  
                      value={category}
                      onChange={(e:any)=>{handleCategoryChange(e.target.value)}}           
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
                   
                     
                    <div className='food-type-div-add'>
                    <label className='food-type-label-add'>Food type:</label>
                    <div className='food-type-radio'>
                    <FormControl>             
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="veg"
                    name="row-radio-buttons-group"
                    onChange={(e)=>setFoodType(e.target.value)}
                    >
                    <FormControlLabel value="veg" control={<Radio /> } label="veg" />
                    <FormControlLabel value="non-veg" control={<Radio />} label="non-veg" />
                    </RadioGroup>
                    </FormControl>
                    </div>
                    
                    </div>
                    
                    {/* <div className='category-div-add'>
                    <label className='category-label-add'>Category:</label>
                    <FormControl sx={{ m: 1, width: 230 }} className='add-category-dropdown'>
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

                    <div className='add-item-btn-div'>
                    <Button variant="contained" className='add-item-btn' onClick={handleSubmit}>Add Item</Button>
                    </div>
                    
                    
                </form>
            </div>
            <VendorModal op={open} cl={handleClose} message={"item added successfully"}/>
        </div>
    )
}
export default AddItem;