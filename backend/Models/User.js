const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    IncomesExpenses:[{
        type: {
            type: String,
            default:"incomeExpenses"
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        amount: {
            type: Number,
            required: true,
            maxLength: 20,
            trim: true
        },
        
        date: {
            type: Date,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 20,
            trim: true
        },
    }],

    OutgoingsExpenses:[{
        type: {
            type: String,
            default:"OutgoingExpensess"
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        amount: {
            type: Number,
            required: true,
            maxLength: 20,
            trim: true
        },
        
        date: {
            type: Date,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 20,
            trim: true
        },
    }]
   
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;