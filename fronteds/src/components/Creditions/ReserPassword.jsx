import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { Apical, handleError, handleSuccess } from "../utils/utils";

function ResetPassword() {
  const [passwordInfo, setPassswordInfo] = useState({
    password: "",
  });
  const { password } = passwordInfo;
  const navigate = useNavigate();
  const history=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...passwordInfo };
    copyLoginInfo[name] = value;
    setPassswordInfo(copyLoginInfo);
  };
  const { id, jwtToken } = useParams();
  console.log(id,jwtToken);
  

  const handleSubmit1 = async (e) => {
    e.preventDefault();
     const {  password } =  passwordInfo;
        if ( !password) {
          return handleError("Password are required");
        }

    try {
      const url = `${Apical}/auth/reset-password/${id}/${jwtToken}`;
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(passwordInfo),
      };
      const respons = await fetch(url, settings);
      const result = await respons.json();
      const { message, error, success } = result;
      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }

   
  };
  const userValid = async () => {
    const res = await fetch(`${Apical}/auth/reset-password/${id}/${jwtToken}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
         
        }
    });

    const data = await res.json()

    if (data.status == 201) {
        console.log("user valid")
    } else {
        history("")
    }
}
useEffect(()=>{
  userValid()
},[])

  return (
    <div
      className="d-flex justify-content-center  position-relative "
      style={{
        paddingTop: "100px",
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="card   w-50  position-absolute">
        <div className="row g-0 ">
          <div className="col-md-6">
            <img
              src="https://i.ytimg.com/vi/TR4rZ1RV0u8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDxvj0wtaXt9dzn0oFbGDXp7mrH7g"
              className="img-fluid rounded  h-100 "
              alt="..."
            />
          </div>
          <div className="col-md-6 mt-5 ">
            <h2 className="text-center ">ForgotPassword</h2>
            <div className="card-body ">
              <form onSubmit={handleSubmit1}>
                {/* <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary d-grid gap-2 col-6 mx-auto "
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
