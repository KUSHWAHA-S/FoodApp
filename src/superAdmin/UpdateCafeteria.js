import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function UpdateCafeteria() {

    const history=useNavigate();
    const [vendor_name, setVendorName] = useState('');
    const [vendor_email, setVendorEmail] = useState('');
    const [vendor_phone, setVendorPhone] = useState('');
    const [shop_name, setShopName] = useState('');
    const [city, setCity] = useState('');
    const [cafetaria, setCafeteria] = useState('');
    const [description,setDescription] = useState('');
    const [vendor_id, setVendorId] = useState(null);
    const [password,setPassword] = useState('');
    const [address,setAddress] =useState('');
    const [licensenumber,setLicenseNumber] =useState('');


    const  updateAPIData=async (e)=>{
        e.preventDefault();
        console.log(localStorage.getItem('ID'),vendor_name);
        //console.log("hi");
         //console.log(vendor_name,shop_name,vendor_email,vendor_phone,city,cafeteria,description);
        //  axios.put(`https://64365a168205915d34f1423b.mockapi.io/alan/:${id}`, {
        //      vendor_name,shop_name,vendor_email,vendor_phone,city,cafeteria,description
        //  })
        await axios.put(`https://64365a168205915d34f1423b.mockapi.io/alan/${vendor_id}`,{

          id:vendor_id,
          vendor_name:vendor_name,
          shop_name:shop_name,
          vendor_email:vendor_email,
          vendor_phone:vendor_phone,
          city:city,
          cafetaria:cafetaria,
          description:description,
          password: password
        })
        .then(res => {console.log(res.data)});
        history("/viewcafeterias");
        
     }

useEffect(() => {
        setVendorId(localStorage.getItem('ID'))
        setVendorName(localStorage.getItem('VendorName'));
        setVendorEmail(localStorage.getItem('VendorEmail'));
        setVendorPhone(localStorage.getItem('VendorPhone'));
        setShopName(localStorage.getItem('ShopName'));
        setCity(localStorage.getItem('City'));
        setCafeteria(localStorage.getItem('Cafetaria'));
        setDescription(localStorage.getItem('Description'))
        setPassword(localStorage.getItem('Password'))

}, []);
  return (
  //   <div>
  //   <div className="container">
  //     <i className="fa fa-user" title="admin"></i>
  //     <h1>Update Shop</h1>
  //     <Link to="/view">
  //     <button className="btn btn-dark bu">Back</button>
  //     </Link> 
  //   </div>
  //   <div className="form-container">
  //     <form onSubmit={updateAPIData}>
  //       <div className="sub-entry">
  //         <div className="form-group">
  //           <input
  //             type="text"
  //             className="mb-4"
  //             id="vendor_name"
  //             placeholder="Vendor Name"
  //             value={vendor_name}
  //             onChange={(e) => setVendorName(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <input
  //             type="text"
  //             className=" mb-4"
  //             id="shop_name"
  //             placeholder="Shop Name"
  //             value={shop_name}
  //             onChange={(e) => setShopName(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <input
  //             type="email"
  //             className=" mb-4"
  //             id="vendor_email"
  //             placeholder="Vendor's email"
  //             value={vendor_email}
  //             onChange={(e) => setVendorEmail(e.target.value)}
  //             required
  //             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  //             title="Format:characters@characters.domain"
  //           />
  //         </div>
  //         <div className="form-group">
  //           <input
  //             type="tel"
  //             className=" mb-4"
  //             id="vendor_phone"
  //             placeholder="Vendor's phone number"
  //             value={vendor_phone}
  //             onChange={(e) => setVendorPhone(e.target.value)}
  //             required
  //             pattern="[0-9]{10}"
  //             title="Phone number must be 10 digits"
  //           />
  //         </div>
  //       </div>
  //       <div className="sub-entry">
  //         <div className="form-group">
  //           <select
  //             className="custom-select custom-select-lg  mb-4"
  //             value={city}
  //             onChange={(e) => setCity(e.target.value)}
  //             required
  //           >
  //             <option value="" disabled selected hidden>
  //               Select a City
  //             </option>
  //             <option value="1">Benguluru</option>
  //             <option value="2">Chennai</option>
  //             <option value="3">Noida</option>
  //           </select>
  //         </div>
  //         <div className="form-group">
  //           <select
  //             className="custom-select custom-select-lg mb-4"
  //             value={cafetaria}
  //             onChange={(e) => setCafeteria(e.target.value)}
  //             required
  //           >
  //             <option value="" disabled selected hidden>
  //               Select a Cafeteria
  //             </option>
  //             <option value="1">Benguluru Common Cafe</option>
  //             <option value="2">Benguluru tower4 cafe</option>
  //             <option value="3">Chennai common cafe</option>
  //             <option value="4">Chennai Tower7 groundfloor </option>
  //             <option value="5">Noida-126 Cafe</option>
  //           </select>
  //         </div>
  //         <div className="form-group">
  //           <input
  //             type="text"
  //             className="mb-4"
  //             id="description"
  //             placeholder="Shop Description"
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             required
  //           />
  //         </div>
  //         {/* <div className="form-group">
  //           <input
  //             type="password"
  //             className=" mb-4"
  //             id="password"
  //             placeholder="Password"
  //             required
  //             pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
  //             title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
  //           />
  //         </div> */}
  //       </div>
  //       <div className="button-container">
  //       <button type="submit" className="btn btn-dark btns" >
  //         Submit
  //       </button></div>
  //     </form>
  //   </div>
  // </div>
  <div>
      <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>UpdateCafe</h1>
        <Link to="/viewcafeterias">
          <button className="btn btn-dark bu">Back</button>
        </Link>
      </div>

      <div className="form-container">
        <form onSubmit={updateAPIData}>
          <div className="sub-entry">
            <div className="form-group">
              <input
                type="text"
                className=" form-control mb-4"
                placeholder="Cafeteria Name"
                onChange={(e) => setShopName(e.target.value)}
                required
              />
            </div>
            {/* <div className="form-group">
              <input
                type="text"
                className="form-control mb-4"
                id="description"
                placeholder="Shop Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div> */}

            {/* <div className="form-group">
              <input
                type="tel"
                className=" form-control mb-4"
                id="vendor_phone"
                placeholder="Vendor's phone number"
                onChange={(e) => setVendorPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div> */}
          </div>
          <div className="sub-entry">
            {/* <div className="form-group">
              <input
                type="tel"
                className="form-control mb-2"
                id="vendor_phone"
                placeholder="License Number"
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </div> */}

            {/* <div className="form-group">
              <select
                className="form control custom-select custom-select-lg mb-4"
                onChange={(e) => setCafeteria(e.target.value)}
                required
              >
                <option value="" disabled selected hidden>
                  Select a Cafeteria
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
            </div> */}

            <div className="form-group">
              <input
                type="text"
                className="form-control  mb-4"
                placeholder="Cafe Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCafeteria;