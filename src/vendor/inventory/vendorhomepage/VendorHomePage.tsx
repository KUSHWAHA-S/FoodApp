import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import './VendorHomePage.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IShopDetails{
    shopId:number
    shopName:string
    shopDescription:string
    phoneNumber:number
    address:string
    phone:string
}

const VendorHomePage = () =>{
    // const shopId = 1
    // const [shopName,setShopName]=useState("")
    // const [intialCategory,setIntialCategory]= useState("")
    // const navigate = useNavigate()

    // const handleShowShop=()=>{
    //     navigate('/vendoritem',{state:{shopid:shopId,shopname:shopName,initialCategory:intialCategory}})
    // }
    // useEffect(()=>{

    //     axios.get("http://localhost:8080/shops/"+shopId)
    //     .then((res)=>{
    //         setShopName(res.data.shopName)
    //     })
        
    //     axios.get("http://localhost:8080/categories/"+shopId).then(
    //         (res)=>{setIntialCategory(res.data[0].categoryName)}

    //     )
      

    // },[])

    const loc = useLocation()
    const userId = loc.state.vendorId
    console.log(loc.state.vendorId)
    const navigate=useNavigate()
    const [vendorShopDetails,setVendorShopDetails] = useState<IShopDetails[]>([])

    useEffect(()=>{
        axios.get("http://localhost:8080/user/shopsBy/"+userId).
        then((res)=>{
            setVendorShopDetails(res.data)
        }
        )
    },[])

    const handleShowShop=(shopId:any,shopName:any)=>{
        if(shopName!=""){
            axios.get("http://localhost:8080/categories/"+shopId).then(
            (res)=>{
                console.log(res.data.length)
                if(res.data.length===0){
                    navigate('/vendoritem',{state:{from:loc.state.from,data:loc.state.data, vendorId:userId,shopid:shopId,shopname:shopName,initialCategory:""}})
                }
                else{
                    navigate('/vendoritem',{state:{from:loc.state.from,data:loc.state.data, vendorId:userId,shopid:shopId,shopname:shopName,initialCategory:res.data[0].categoryName}})
                }               
            }
     )}
        
    }

    return(
        <div className='vendor-homepage-div'>
            <h1>Shops</h1>
            <div>
                {vendorShopDetails.map((shops)=>{
                    return(
                    <div key={shops.shopId}>
                    <Card className='view-shop-details-card'>
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      <u>{shops.shopName}</u>
                      </Typography>
                      <div>
                      <div>
                      <div>Description : {shops.shopDescription}</div>
                      </div>
                      <div>                        
                        <div>Address: {shops.address}</div>
                        <div>Phone Number : {`${shops.phoneNumber}`}</div>
                      </div>
                      </div>
                      </CardContent>
                      <CardActions>
                      <Button size="small" className='update-btn-view' onClick={()=>{handleShowShop(`${shops.shopId}`,`${shops.shopName}`)}}>view shop details</Button>
                      </CardActions>
                    </Card>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
export default VendorHomePage