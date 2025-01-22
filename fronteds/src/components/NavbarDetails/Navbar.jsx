import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/utils";


const Navbar = () => {

 const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
}, [])

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("");
    handleSuccess("Logout successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="offcanvasExample"
          >
            <span
              className="navbar-toggler-icon"
              data-bs-target="#sidebar"
            ></span>
          </button>
          <Link
            className="navbar-brand me-auto ms-lg-0 ms-3 mt-2 text-uppercase fw-bold"
            to='/dashboard'
          >
            Expensess-details
            
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mt-2 " id="navbarSupportedContent">
            <form className="d-flex ms-auto mx-3 serach1" role="search">
             
            </form>
           
            <h1 style={{color:"white"}}>{loggedInUser}</h1>
            <button onClick={handleLogout} className="mx-3">Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
