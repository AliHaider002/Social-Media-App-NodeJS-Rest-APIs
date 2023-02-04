import User from "../Models/User.js";
import bcrypt from 'bcrypt';

/* GET USER */
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json("User does not exist");
        } else {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* UPDATE USER */
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password, email } = req.body;
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt();
                req.body.password = await bcrypt.hash(password, salt);
            }
            if (email) {
                const check = await User.findOne({ email: email });
                if (!check) {
                    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
                    res.status(200).json(user);
                } else {
                    res.status(500).json("User Already Exist");
                }
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }


    } else {
        res.status(500).json("You can only Update your Profile");
    }
}

/* DELETE USER */

export const deleteUser = async (req,res) => {
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body;
    if (id === currentUserId || currentUserAdminStatus){
        await User.findByIdAndDelete(id);
        res.status(200).json("User deleted Successfully.");
    }else{
        res.status(500).json("You have no access to this profile");
    }
}

/* FOLLOW USER */
export const followUser = async (req,res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    const followUser = await User.findById(id);
    const followingUser = await User.findById(currentUserId);
    try{
        if (!followUser.followers.includes(currentUserId)){
            await followUser.updateOne({$push : {followers: currentUserId}});
            await followingUser.updateOne({$push : {following: id}});
            res.status(200).json(`you are ${followingUser.lastName} and you followed ${followUser.lastName}`);
        }else{
            res.status(500).json("User is already followed by You.");
        }
    }catch(err){
        res.status(500).json(err);
    }
}
/* UNFOLLOW USER */
export const unFollowUser = async (req,res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    const followUser = await User.findById(id);
    const followingUser = await User.findById(currentUserId);
    try{
        if (followUser.followers.includes(currentUserId)){
            await followUser.updateOne({$pull : {followers: currentUserId}});
            await followingUser.updateOne({$pull : {following: id}});
            res.status(200).json(`you are ${followingUser.lastName} and you unfollowed ${followUser.lastName}`);
        }else{
            res.status(500).json("User is already not following by You.");
        }
    }catch(err){
        res.status(500).json(err);
    }
}