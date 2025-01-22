const {  addOutgoingExpensess, getOutgoingExpensess, deleteOutgoingExpensess } = require('../Controllers/Expensess')
const {  addIncome, getIncome, deleteIncome } = require('../Controllers/Income')
const { addValidation } = require('../Middleware/AuthValidations')

const router=require('express').Router()

router.post("/addIncome",addValidation,addIncome)
router.get("/getIncome",getIncome)
router.delete("/:expenseId",deleteIncome)


router.post("/addOutgoing",addValidation,addOutgoingExpensess)
router.get("/getOutgoing",getOutgoingExpensess)
router.delete("/deletedOutgoing/:expenseId",deleteOutgoingExpensess)



module.exports=router