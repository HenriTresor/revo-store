import { Schema, model } from 'mongoose'
import { hash } from 'bcrypt'

const userSchema = new Schema({
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    fullNames: { type: String, required: true, trim: true, minlength: 4 },
    role: { type: String, enum: ['buyer', 'vendor'], required: true },
    password: { type: String, required: true, min: 6 }
},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function () {
    try {
        let hashedPwd = await hash(this.password, 10)
        this.password = hashedPwd
    } catch (error) {
        console.log(`error hashing password ${error.message}`);
    }
})

const User = model('users', userSchema)

export default User