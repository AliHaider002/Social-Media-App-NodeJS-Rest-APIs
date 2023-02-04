import Post from "../Models/Post.js";
import mongoose from "mongoose";
import e from "express";

/* CREATE POST */
export const createPost = async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        res.status(200).json("Post is Created")
    } catch (err) {
        res.status(500).json(err)
    }
}

/* Get A POST */
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

/* UPDATE POST */
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const user = req.body.userId;
    const post = await Post.findById(id);
    if (post.userId == user) {
        try {
            await Post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(500).json("action Forbidden");
    }
}

/* DELETE POST */
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const user = req.body.userId;
    try {
        const post = await Post.findById(id);
        if (post.userId == user) {
            await post.deleteOne();
            res.status(200).json("Post Deleted");
        } else {
            res.status(500).json("action Forbidden");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

/* LIKE AND DISLIKE POST */
export const likePost = async (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;
    try {
        const post = await Post.findById(id);
        if (!post.like.includes(userId)) {
            await post.updateOne({ $push: { like: userId } });
            res.status(200).json("Post Liked");
        } else {
            await post.updateOne({ $pull: { like: userId } });
            res.status(200).json("Post DisLiked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
} 

// Fetching the TimeLine
export const timelinePost = async (req,res) => {
    const userId = req.body.id;
    const posts = await Post.find();
    const currentUserPosts = await Post.findOne({userId: userId});
    const followingPosts = await Post.aggregate([
        {
            $match :{
                _id : new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "posts",
                localField: "following",
                foreignField: "userId",
                as : "followingPosts"
            }
        },
        {
            $project:{
                followingPosts: 1,
                _id: 0
            }
        }
    ]);
    res.status(500)
    .json(posts.concat(followingPosts)
    .sort((a,b,) => {
        return b.createdAt - a.createdAt
    })
    )
}