const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        const decode =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findOne({ _id: decode.id, deletedAt: { $ne: null } })
            .select('name email role cart')
            .lean();

        if (!user) {
            return res.status(400).json({msg: "User not found"})
        }

        req.user = {
            ...user,
            id: decode.id
        }

        return next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth
