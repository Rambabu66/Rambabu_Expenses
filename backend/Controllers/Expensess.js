const UserModel=require('../Models/User')

const addOutgoingExpensess=async(req,res)=>{
    const {_id}=req.user;
    try {
        const userModel=await UserModel.findByIdAndUpdate(
            _id,
            {$push:{OutgoingsExpenses:req.body}},
            {new:true}
        )
        res.status(200)
        .json({
            message:"AddOutgoingExpenses SuceessFully",
            success:true,
            data:userModel?.OutgoingsExpenses
        })
    } catch (err) {
        return res.status(500).json({
            message:"Sommething went wrong",
            error:err,
            success:false
        })
    }
}
const getOutgoingExpensess=async(req,res)=>{
    const {_id}=req.user;
    try {
        const userModel=await UserModel.findById(_id).select("OutgoingsExpenses")
        res.status(200)
        .json({
            message:"getOutgoingExpenses SuceessFully",
            success:true,
            data:userModel?.OutgoingsExpenses
        })
    } catch (err) {
        return res.status(500).json({
            message:"Sommething went wrong",
            error:err,
            success:false
        })
    }
}

const deleteOutgoingExpensess = async (req, res) => {
    const { _id } = req.user;
    const expenseId = req.params.expenseId;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { OutgoingsExpenses: { _id: expenseId } } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense Deleted successfully",
                success: true,
                data: userData?.OutgoingsExpenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}


module.exports={
    addOutgoingExpensess,
    getOutgoingExpensess,
    deleteOutgoingExpensess
}