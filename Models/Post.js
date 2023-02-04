import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
    userId:{
        type : String,
        required : true
    },
    desc: String,
    like: [],
    img: String
},{timestamps: true}
);

const Post = mongoose.model('Post', PostModel);

export default Post;