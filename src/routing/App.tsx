import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from "./Auth";
import MOLogin from "./MOLogin";
import HomePage from '../common/HomePage';
import Login from '../users/login/Login';
import Role from '../users/login/Role';
import './App.css';



import CustomerItemPage from '../customer/CustopmerItemPage';
import Location from '../customer/Location';

// =========adminPortal imports======================

import AddVendor from "../admin/AddVendor";
import Admin from "../admin/admin";
import AddShop from "../admin/AddShop";
import Read from "../admin/Read";
import Update from "../admin/Update";
import UpdateShop from "../admin/UpdateShop";
import ViewShops from "../admin/ViewShops";

//================super admin imports====================

import AddAdmin from "../superAdmin/AddAdmin";
import SuperAdmin from "../superAdmin/SuperAdmin";
import AddCafeteria from "../superAdmin/AddCafeteria";
import ViewAdmins from "../superAdmin/ViewAdmins";
import ViewCafeterias from "../superAdmin/ViewCafeterias";
import UpdateAdmin from "../superAdmin/UpdateAdmin";
import UpdateCafeteria from "../superAdmin/UpdateCafeteria";

//================vendor inventory flow====================

import AddItem from "../vendor/inventory/additem/AddItem";
import UpdateItem from "../vendor/inventory/updateitem/UpdateItem";
import VendorItem from "../vendor/inventory/vendoritems/VendorItem";
import AddCategory from "../vendor/inventory/addcategory/AddCategory";
import UpdateCategory from "../vendor/inventory/updatecategory/UpdateCategory";
import CustomerItem from "../vendor/inventory/customeritems/CustomerItem";
import VendorViewShop from '../vendor/inventory/viewshop/VendorViewShop';
import VendorCafeteria from "../vendor/inventory/vendorcafeteria/VendorCafeteria";
import VendorHomePage from "../vendor/inventory/vendorhomepage/VendorHomePage";
import Header from '../header/header';




function App() {

  const value = useContext(AuthContext);
  const auth = value?.auth;
  console.log(value);
  console.log(auth);
  let routes: any=(<Route path="*" element={<Navigate to="/" replace />} />);
  let heading : string ="";


  if (auth?.getAuth && auth.userId === "4") {
    console.log(auth);
    heading= "Welcome..."
    routes = (
      <Routes><Route path="/role" element={<Role />}></Route></Routes>
    );
  }
  else if (auth?.getAuth && auth.userId === "3" ) {
    heading = "Yash";
    routes = (
      <Routes>
        <Route path="/customerLocation" element={<Location />}></Route>
        <Route path="/customerItem" element={<CustomerItemPage />}></Route>
      </Routes>
    );
  }
  else if (auth?.getAuth && auth.userId === "2" ) {
    heading = "Vendor";
    routes = (
      <Routes>
        <Route path='/vendoritem' element={<VendorItem />} />
        <Route path='/vendorviewshops' element={<VendorViewShop />} />
        <Route path='/additem' element={<AddItem />} />
        <Route path='/updateitem' element={<UpdateItem />} />
        <Route path='/addcategory' element={<AddCategory />} />
        <Route path='/updatecategory' element={<UpdateCategory />} />
        <Route path="/customeritemlist" element={<CustomerItem />} />
        <Route path="/vendorCafeteria" element={<VendorCafeteria />}></Route>
        <Route path="/vendorHomePage" element={<VendorHomePage />}></Route>
      </Routes>
    );
  }
  else if (auth?.getAuth && auth.userId === "1" ) {
    heading = "Admin";
    routes = (
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddVendor />} />
        <Route path="/view" element={<Read />} />
        <Route path="/viewshops" element={<ViewShops />}></Route>
        <Route path="/update" element={<Update />} />
        <Route path="/addshop" element={<AddShop />} />
        <Route path="/updateshop" element={<UpdateShop />} />
      </Routes>
    );
  }
  else if (auth?.getAuth && auth.userId === "5") {
    heading = "SuperAdmin";
    routes = (
      <Routes>
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/addcafeteria" element={<AddCafeteria />} />
        <Route path="/viewadmins" element={<ViewAdmins />} />
        <Route path="/viewcafeterias" element={<ViewCafeterias />} />
        <Route path="/updateadmin" element={<UpdateAdmin />} />
        <Route path="/updatecafeterias" element={<UpdateCafeteria />} />
      </Routes>
    );
  }
  else {
    console.log("hello");
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/MOLogin" element={<MOLogin />}></Route>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    );

  }
  return (
    <React.Fragment>
      {auth?.getAuth && <Header head={heading} ></Header>}
      {routes}
    </React.Fragment>
  );

}

export default App;




{/* <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/customerItem" element={<CustomerItemPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/role" element={<Role />}></Route>
      {/* <Route path="/vendor" element={<AddVendor />}></Route>
      <Route path="/superAdmin" element={<SuperAdmin />}></Route>

      //  ========adminportal=============== 

      <Route path="/admin" element={<Admin />} />
      <Route path="/add" element={<AddVendor />} />
      <Route path="/view" element={<Read />} />
      <Route path="/viewshops" element={<ViewShops />}></Route>
      <Route path="/update" element={<Update />} />
      <Route path="/addshop" element={<AddShop />} />
      <Route path="/updateshop" element={<UpdateShop />} />

      //  ==============superadminportals=================== 

      <Route path="/superadmin" element={<SuperAdmin />} />
      <Route path="/addadmin" element={<AddAdmin />} />
      <Route path="/addcafeteria" element={<AddCafeteria/>}/>
      <Route path="/viewadmins" element={<ViewAdmins/>}/>
      <Route path="/viewcafeterias" element={<ViewCafeterias/>}/>
      <Route path="/updateadmin" element={<UpdateAdmin/>}/> 
      <Route path="/updatecafeterias" element={<UpdateCafeteria/>}/>

      //  ==============vendor inventory flow=================== 

        <Route path='/vendoritem' element={<VendorItem/>}/>
        <Route path='/vendorviewshops' element={<VendorViewShop/>}/>
        <Route path='/additem' element={<AddItem/>} />
        <Route path='/updateitem' element={<UpdateItem/>} />
        <Route path='/addcategory' element={<AddCategory/>} />
        <Route path="/customeritemlist" element={<CustomerItem/>} />
        <Route path="/vendorCafeteria" element={<VendorCafeteria />}></Route>


    </Routes>  */}