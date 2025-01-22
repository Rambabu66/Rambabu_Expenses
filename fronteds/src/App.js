import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductRouter from "./components/ProductRouter";
import Login from "./components/Creditions/Login";
import Signup from "./components/Creditions/Signup";
import SlidbarNav from "./components/NavbarDetails/SlidbarNav";
import Incomes from "./components/Income/Incomes";
import Expensess from "./components/Expensess/Expensess";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/ViewUsers/Users";
import ForgotPassword from "./components/Creditions/ForgotPassword";
import ResetPassword from "./components/Creditions/ReserPassword";

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:jwtToken" element={<ResetPassword/>} />

        <Route
          path="/dashboard"
          element={
            <ProductRouter>
              <SlidbarNav />
              <Dashboard />
            </ProductRouter>
          }
        />
        

        <Route
          path="/incomes"
          element={
            <ProductRouter>
              <SlidbarNav />
              <Incomes />
            </ProductRouter>
          }
        />
        <Route
          path="/expensess"
          element={
            <ProductRouter>
              <SlidbarNav />
              <Expensess/>
            </ProductRouter>
          }
        />
         <Route
          path="/users"
          element={
            <ProductRouter>
              <SlidbarNav />
              <Users/>
            </ProductRouter>
          }
        />
       
      </Routes>
      
    </Router>
  );
}

export default App;
