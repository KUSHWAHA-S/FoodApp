import React, { useState, useEffect } from "react";
import "./Style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCafeteria = () => {
  const history = useNavigate();
  const [shop_name, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [vendor_phone, setVendorPhone] = useState("");
  const [address, setAddress] = useState("");

  const [location, setLocation] = useState();


  const addCafeteria = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      // 👇️ const data: CreateUserResponse

      axios.post(
        'http://localhost:8080/cafe/add',
        {
          name: shop_name,
          address: address,
          email: email,
          status: "Active",
          location: location,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then((response) => {
        console.log(response.data);
        history("/superadmin");
        // setRole(response.data.listRole);
        // setResponseMsg(response.data.msg);

      }).catch(error => {
        console.log(error.message);
        if (error.message === 'Network Error') {
          alert("Something went Wrong. Please login again.");
          // <Modal  />
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }


  };

  useEffect(() => {
    axios.get("http://localhost:8080/location")

      .then((res) => {
        setData(res.data);
        // setRecords(res.data);
        // setLoading(false);
        console.log(res.data);
        // console.log(isLoading);
      });
  }, []);

  return (
    <div>
      <div className="d-flex  m-2 container">
        <i className="fa fa-user" title="admin"></i>
        <h1>Add Cafeteria</h1>
        <Link to="/superadmin">
          <button className="btn btn-dark bu">Back</button>
        </Link>
      </div>

      <div className="form-container">
        <form onSubmit={addCafeteria}>
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
            <div className="form-group">
              <input
                type="email"
                className=" mb-4 form-control"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                title="Format:characters@characters.domain"
              />
              {/* <div className="invalid-feedback">
                Please Enter your email correctly
              </div> */}
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


            <div className="form-group">
              <select
                className="form control custom-select custom-select-lg mb-4"
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="" disabled selected hidden>
                  Select a Location
                </option>
                {data && data.map(e => {
                  return (<option value={e.name}>
                    {e.name}
                  </option>)
                })}


              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control  mb-4"
                placeholder=" Cafeteria Address"
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
  );
};

export default AddCafeteria;
