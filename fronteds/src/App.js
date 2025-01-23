import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductRouter from "./components/ProductRouter";
// import Login from "./components/Creditions/Login";
// import Signup from "./components/Creditions/Signup";
// import SlidbarNav from "./components/NavbarDetails/SlidbarNav";
// import Incomes from "./components/Income/Incomes";
// import Expensess from "./components/Expensess/Expensess";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Users from "./components/ViewUsers/Users";
// import ForgotPassword from "./components/Creditions/ForgotPassword";
// import ResetPassword from "./components/Creditions/ReserPassword";
import { lazy, Suspense } from "react";
const ProductRouter = lazy(() => import("./components/ProductRouter"));
const Login = lazy(() => import("./components/Creditions/Login"));
const Signup = lazy(() => import("./components/Creditions/Signup"));
const SlidbarNav = lazy(() => import("./components/NavbarDetails/SlidbarNav"));
const Incomes = lazy(() => import("./components/Income/Incomes"));
const Expensess = lazy(() => import("./components/Expensess/Expensess"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Users = lazy(() => import("./components/ViewUsers/Users"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="text-dark p-2">
                  Login are loading please wait...
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense
              fallback={
                <div className="text-dark">
                  SignUp are loading please wait...
                </div>
              }
            >
              <Signup />
            </Suspense>
          }
        />
        {/* <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:id/:jwtToken"
          element={<ResetPassword />}
        /> */}

        <Route
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <div className="text-dark">
                  Dashboard are loading please wait...
                </div>
              }
            >
              <ProductRouter>
                <SlidbarNav />
                <Dashboard />
              </ProductRouter>
            </Suspense>
          }
        />

        <Route
          path="/incomes"
          element={
            <Suspense
              fallback={
                <div className="text-dark">
                  Incomes are loading please wait...
                </div>
              }
            >
              <ProductRouter>
                <SlidbarNav />
                <Incomes />
              </ProductRouter>
            </Suspense>
          }
        />
        <Route
          path="/expensess"
          element={
            <Suspense
              fallback={
                <div className="text-dark">
                  Expensess are loading please wait...
                </div>
              }
            >
              <ProductRouter>
                <SlidbarNav />
                <Expensess />
              </ProductRouter>
            </Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <Suspense
              fallback={
                <div className="text-dark">
                  Users are loading please wait...
                </div>
              }
            >
              <ProductRouter>
                <SlidbarNav />
                <Users />
              </ProductRouter>
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
