const { login, signup, getUsers, getUsersiD, deleteUsers,  } = require('../Controllers/AuthControllers')
const { loginValidation, signupValidation } = require('../Middleware/AuthValidations')

const router= require('express').Router()


router.post("/login",loginValidation,login)
router.post("/signup",signupValidation,signup)
router.get("/allusers",getUsers)
router.get("/signleuser/:userId",getUsersiD)
router.delete("/deleteuser/:DeleteuserId",deleteUsers)
// router.post("/forgotpassword",forgotPassword)
// router.post("/reset-password/:id/:jwtToken",resetPassword)
// router.get("/reset-password/:id/:jwtToken",resetGetPassword1)
// router.post("/changePassword",changePassword)



module.exports=router