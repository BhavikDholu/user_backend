const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    mobile : String,
    gender : String,
    status : {type : Boolean , default : true},
    profile : String,
    location : String
});

const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}