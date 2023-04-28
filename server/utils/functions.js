import User from "../models/User.model.js";

export const checkUserByEmail = async (email) => {
    let user = await User.findOne({ email: email })
    if (user) return { status: true, user }
    return false
}