import axios from 'axios';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./VendorViewShop.css";


interface IShops{
    shopId:number,
    address:String,
    license_number:String,
    phone_number:number,
    rating:number,
    shopDescription:String,
    shopName:String,

}

interface ICat{
    categoryId:Number
    categoryName:String
  }

const VendorViewShop=()=>{

    const [viewShops,setViewShops]= useState<IShops[]>([]);
    const navigate=useNavigate();
    const loc=useLocation()
    const cafeName = loc.state.resp
    const [initialCategory,setInitialCategory] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:8080/shop/"+cafeName).then(res=>setViewShops(res.data))
    },[])


    const handleShopBtnChange=(val:any,shopname:any)=>{
        navigate('/vendoritem',{state:{shopid:val,shopname:shopname}})

    }

    return(
        <div>
            <h3 className='view-shop-heading-food'><u>Explore Food Counter</u></h3>
            {viewShops.length>0 && viewShops.map((shops)=>{
                    return(
                    <div className='item-list-view-div' key={`${shops.shopId}`}>
                    <Button className='view-shop-btn' onClick={()=>{handleShopBtnChange(`${shops.shopId}`,`${shops.shopName}`)}}>
                      <Card className='card-view'>
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      <u>{shops.shopName}</u>
                      </Typography>
                      <div>
                      <div>Description : {shops.shopDescription}</div>
                      </div>
                      
    
                      </CardContent>
                      <CardActions>
                      <Button size="small" className='update-btn-view'>view items</Button>
                     
                      </CardActions>
                      </Card>
                    </Button>
                    </div>

                    )

                })
            }
        </div>
    )
}

export default VendorViewShop;