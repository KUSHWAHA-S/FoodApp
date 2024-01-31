import React, { useState } from "react";
// import "./RegistrationForm.css";

const RegistrationForm: React.FC = () => {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [formErrors, setFormErrors] = useState({

    username: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;

    switch (name) {

      case "username":

        setUsername(value);

        break;

      case "email":

        setEmail(value);

        break;

      case "phone":

        setPhone(value);

        break;

      case "password":

        setPassword(value);

        break;

      case "confirmPassword":

        setConfirmPassword(value);

        break;

      default:

        break;

    }

  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {

      setFormErrors(errors as {
        username: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;

      });

    } else {

      setFormErrors({

        username: "",

        email: "",

        phone: "",

        password: "",

        confirmPassword: "",

      });

      // submit the form

    }

  };


  const validate = (): { [key: string]: string } => {

    const errors: { [key: string]: string } = {};

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const phoneRegex = /^\d{10}$/;


    if (!username.trim()) {

      errors.username = "Username is required";

    }

    if (!emailRegex.test(email)) {
     errors.email = "Invalid email address";

    }

    if (!phoneRegex.test(phone)) {

      errors.phone = "Invalid phone number";

    }

    if (password.length < 8) {

      errors.password = "Password must be at least 8 characters long";

    }

    if (password !== confirmPassword) {

      errors.confirmPassword = "Passwords do not match";

    }

    return errors;

  };


  const getInputStyle = (name: string): React.CSSProperties => {

    const style: React.CSSProperties = {

      padding: "5px",

      borderRadius: "5px",

      border: "3px solid #ccc",

      fontSize: "16px",

    };


    if (formErrors[name]) {

      style.borderColor = "red";

    } else if (getFieldValue(name)) {

      style.borderColor = "green";

    }


    return style;

  };


  const getErrorMessage = (name: string): string => {

    return formErrors[name] || "";

  };


  const getFieldValue = (name: string): string => {

    switch (name) {

      case "username":

        return username;

      case "email":

        return email;

      case "phone":

        return phone;

      case "password":

        return password;

      case "confirmPassword":

        return confirmPassword;

      default:

        return "";

    }

  };


  return (
    <div className="page"><h2 id="he" >REGISTRATION</h2>
    <form onSubmit={handleSubmit}>
    <label className="head" htmlFor="username">Username:</label>
   <input type="text" id="username" name="username" value={username} onChange={handleInputChange} style={getInputStyle("username")} />
    <span style={{ color:"red"}}>{getErrorMessage("username")}</span>
    <label className="head" htmlFor="email">Email:</label>
    <input type="email"id="email"name="email"value={email}onChange={handleInputChange}style={getInputStyle("email")}/>
    <span style={{ color:"red"}}>{getErrorMessage("email")}</span>
   <label className="head" htmlFor="phone">Phone:</label>
    <input type="tel"id="phone"name="phone"value={phone}onChange={handleInputChange}style={getInputStyle("phone")}/>
    <span style={{ color:"red"}}>{getErrorMessage("phone")}</span>
    <label className="head" htmlFor="password">Password:</label>
    <input type="password"id="password"name="password"value={password}onChange={handleInputChange}style={getInputStyle("password")}/>
    <span style={{color:"red"}}>{getErrorMessage("password")}</span>
   <label  className="head" htmlFor="confirmPassword">Confirm Password:</label>
    <input type="password"id="confirmPassword"name="confirmPassword"value={confirmPassword}onChange={handleInputChange}style={getInputStyle("confirmPassword")}/>
    <span style={{color:"red"}}>{getErrorMessage("confirmPassword")}</span>
    <button  type="submit">Submit</button>
    <button  type="submit" onClick={() => window.location.href = '/login'}>Login</button>
    </form>
    </div>
    );};

export default RegistrationForm;







