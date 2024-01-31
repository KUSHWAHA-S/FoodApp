import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



function UpdateShop() {

    const history=useNavigate();
    
    const [phone, setPhone] = useState("");
    const [shop_phone, setShopPhone] = useState("");
    const [shop_name, setShopName] = useState('');
  
    const [cafetaria, setCafeteria] = useState('');
    const [description,setDescription] = useState('');
    const [vendor_id, setVendorId] = useState("");
    const loc = useLocation();
    const [address,setAddress] =useState('');
    //const userphone=localStorage.getItem("UserPhone");
    const [user_phone,setUserPhone] = useState("");

    const  updateAPIData=async (e)=>{
        e.preventDefault();
        //console.log(vendor_id);
        console.log(localStorage.getItem("ShopId"));
        await axios.put(`http://localhost:8080/shops/update/${localStorage.getItem("ShopId")}`,{
        shopId:localStorage.getItem("ShopId"),
        shopName: shop_name,
        phoneNumber: shop_phone,
        cafeteriaName: cafetaria,
        shopDescription: description,
        address: address,
        phone: phone
        })
        .then(res => {console.log(res.data)});
        history("/view",{state:{from: loc.state.from}});
        
     }

useEffect(() => {
        setVendorId(localStorage.getItem("ShopID"))
        
        setShopPhone(localStorage.getItem('ShopPhone'));
        setShopName(localStorage.getItem('ShopName'));
        setPhone(localStorage.getItem("Phone"));
        //setCafeteria(localStorage.getItem('Cafetaria'));
        setDescription(localStorage.getItem('Description'));
        setAddress(localStorage.getItem("Address"));
        setUserPhone(localStorage.getItem("UserPhone"));

}, []);
  return (
 
  <div>
      {/* <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>UpdateShop</h1>
        
      </div> */}
      <h1>UpdateShop</h1>

      <div className="form-container">
        <form onSubmit={updateAPIData}>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="text"
                className=" form-control mb-4"
                placeholder="Shop Name"
                value={shop_name}
                onChange={(e) => setShopName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-4"
                id="description"
                value={description}
                placeholder="Shop Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                //id="vendor_phone"
                placeholder="Shop phone number"
                value={shop_phone}
                onChange={(e) => setShopPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div>
          </div>
          <div className="sub-entry">
           
          <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                id="vendor_phone"
                placeholder="Vendor's phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div>

            <div className="form-group">
              <select
                className="form control custom-select custom-select-lg mb-4"
                onChange={(e) => setCafeteria(e.target.value)}
                required
              >
                <option value="" disabled selected hidden>
                  Select a Cafeteria
                </option>
                <option value="cafe1">
                  cafe1
                </option>
                <option value="Benguluru Common Cafe">
                  Benguluru Common Cafe
                </option>
                <option value="Benguluru tower4 cafe">
                  Benguluru tower4 cafe
                </option>
                <option value="Chennai common cafe">Chennai common cafe</option>
                <option value="Chennai Tower7 groundfloor">
                  Chennai Tower7 groundfloor{" "}
                </option>
                <option value="Noida-126 Cafe">Noida-126 Cafe</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control  mb-4"
                placeholder=" Shop Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-dark next">
              Submit
            </button>
            <Link to="/viewshops">
          <button className="btn btn-dark cancel">Cancel</button>
        </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateShop