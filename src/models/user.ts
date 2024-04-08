import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is requerided"],
        match: [
            /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
            "Email is not valid",
        ],
    },

    password: {
        type: String,
        required: [true, "Password is requerided"],
        select: false,
    },

    fullname: {
        type: String,
        required: [true, "Fullname is requerided"],
        minLength: [5, "Fullname must be at least 5 characters"],
        maxLength: [15, "Fullname must be at most 15 characters"],
    },
})

// si existe un modelo toma ese si no crea auno nuevo (importante en nextjs)
const User = models.User || model('User', userSchema) 
export default User