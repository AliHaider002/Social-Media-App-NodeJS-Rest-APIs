import User from "../Models/User.js";
import bcrypt from 'bcrypt'

export const registerRoute = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    try {
        const check = await User.findOne({ email: email });
        if (!check) {
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashed
            });
            await newUser.save();
            delete newUser.password;
            res.status(200).json(newUser)
        } else {
            res.status(500).json("User Already Exist");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

/* LOGG IN */

export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(500).json("User Does not Exist");
        } else {
            const validity = await bcrypt.compare(password, user.password);
            validity ? res.status(200).json(user) : res.status(500).json("Wrong Password")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}