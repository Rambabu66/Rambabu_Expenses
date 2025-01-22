import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { Apical, handleError, handleSuccess } from '../utils/utils';

const ForgotPassword = () => {
  const [emailInfo, setEmailInfo] = useState({
    email:''
  });

  const {email} =emailInfo
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...emailInfo };
    copyLoginInfo[name] = value;
    setEmailInfo(copyLoginInfo);
  };
  // console.log(lofingInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = `${Apical}/auth/forgotpassword`;
      const settings = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(emailInfo)
    };
      const respons = await fetch(url,settings)
      const result = await respons.json();
      const { message, error,  success } = result;
      if (success) {
        handleSuccess(message);
       
        // window.location.href="./userDetails"
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      // console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

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
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
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
                </div>
                {/* <div className="mb-3">
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
                </div> */}

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
};


export default ForgotPassword