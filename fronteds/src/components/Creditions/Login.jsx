import React, { useState } from "react";
import { Apical, handleError, handleSuccess } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const [lofingInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = lofingInfo;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...lofingInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log(lofingInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = lofingInfo;
    if (!email || !password) {
      return handleError("All feild are required");
    }
    try {
      const url = `${Apical}/auth/login`;
      const respons = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(lofingInfo),
      });
      const result = await respons.json();
      const { message, error, jwtToken, name, success } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
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
            <h2 className="text-center ">Login</h2>
           
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
                    placeholder="Enter Your Emial"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="example-search-input" className="form-label">
                    Password
                  </label>

                  <div class="input-group">
                    <input
                      className="form-control border-end-0 border"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      id="example-search-input"
                    />
                    <span className="input-group-append">
                      <button
                        className="btn btn-outline-secondary bg-secondary text-white border-start-0 border-bottom-0 border "
                        type="button"
                        onClick={handlePasswordShow}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye-fill"></i>
                        ) : (
                          <i className="bi bi-eye-slash-fill"></i>
                        )}
                      </button>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary d-grid gap-2 col-6 mx-auto animate__animated animate__zoomIn animate__repeat-3 "
                >
                  Login
                </button>
              </form>
              <div className="py-2">
                Don't have an Account?
                <Link to="/register">Register</Link>
              </div>
              {/* <div className="py-2">
                
                <Link to="/forgotPassword">Forgotpassword</Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
