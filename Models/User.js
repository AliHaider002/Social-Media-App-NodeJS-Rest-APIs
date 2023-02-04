import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isNgo: {
        type: Boolean,
        default: false
    },
    isRest: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    occupation: {
        type: String,
        default: " "
    },
    followers: {
        type: Array,
        default: [" "]
    },
    following: {
        type: Array,
        default: [" "]
    },
},
{timestamps: true}
);
const User = mongoose.model("User", UserModel);
export default User;