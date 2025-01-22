const UserModel = require("../Models/User");

const addIncome = async (req, res) => {
    const { _id } = req.user;
    
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $push: { IncomesExpenses: req.body } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense added successfully",
                success: true,
                data: userData?.IncomesExpenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const getIncome = async (req, res) => {
    const { _id } = req.user;
   
    try {
        const userData = await UserModel.findById(_id).select('IncomesExpenses');
        res.status(200)
        .json({
            message:"getOutgoingExpenses SuceessFully",
            success:true,
            data:userData?.IncomesExpenses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const deleteIncome = async (req, res) => {
    const { _id } = req.user;
    const expenseId = req.params.expenseId;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { IncomesExpenses: { _id: expenseId } } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense Deleted successfully",
                success: true,
                data: userData?.IncomesExpenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}



module.exports = {
   addIncome,
   getIncome,
   deleteIncome,
   
}