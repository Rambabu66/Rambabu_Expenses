import React from "react";
import { NavLink } from "react-router-dom";
import { trend,expenses, users} from "../utils/Icons";


const Sidebars = () => {
  
  return (
    <>
      <div
        className="offcanvas offcanvas-start sidebar-nav bg-dark "
        tabIndex="-1"
        id="sidebar"
      >
        <div className="offcanvas-body p-0 ">
          <ul className="navbar-nav  mt-4 mb-lg-0 ">
           
            <NavLink
              to="/dashboard"
              style={(isActive) => ({
                color: isActive ? "green" : "blue",
              })}
              className="text-white fs-4 text-decoration-none "
            >
              <li className="nav-item">
                <p className="nav-link px-3">
                  <span className="me-2">
                  <i className="fa fa-dashboard"></i>
                  </span>
                  <span className="nav1">Dashboard</span>
                  
                </p>
              </li>
            </NavLink>
            <NavLink
              to="/incomes"
              style={(isActive) => ({
                color: isActive ? "green" : "blue",
              })}
              className="text-white fs-4 text-decoration-none "
            >
              <li className="nav-item">
                <p className="nav-link px-3">
                  <span className="me-2">
                    {trend}
                  </span>
                  <span className="nav1">Incomes</span>
                  
                </p>
              </li>
            </NavLink>

            <NavLink
              to="/expensess"
              style={(isActive) => ({
                color: isActive ? "green" : "blue",
              })}
              className="text-white fs-4 text-decoration-none"
            >
              <li className="nav-item">
                <p className="nav-link px-3">
                  <span className="me-2">
                    {expenses}
                  </span>
                  <span className="nav1">Expenses</span>
                  
                </p>
              </li>
            </NavLink>
            <NavLink
              to="/users"
              style={(isActive) => ({
                color: isActive ? "green" : "blue",
              })}
              className="text-white fs-4 text-decoration-none"
            >
              <li className="nav-item">
                <p className="nav-link px-3">
                  <span className="me-2">
                    {users}
                  </span>
                  <span className="nav1">Users</span>
                  
                </p>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebars;
