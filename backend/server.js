const express = require("express");

const app = express();
require("dotenv").config();

// Db Connected
require("./Database/Database")
// app.set("view engine", "ejs");

// port number 
const port = process.env.PORT;

// Router
const bodyParser = require("body-parser");
const cors=require('cors')
const AuthRouter=require("./Routers/AuthRouters")
const ExpensRouter=require("./Routers/ExpenseRouter");
const ensureAuthenticated = require("./Middleware/Auth");
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.urlencoded({ extended: false }));

// middleware
app.use(bodyParser.json())
app.use(cors())
app.use("/auth",AuthRouter)
app.use("/expenses", ensureAuthenticated,ExpensRouter)

app.listen(port, () => {
  console.log(`Server is working fine ${port}`);
});
