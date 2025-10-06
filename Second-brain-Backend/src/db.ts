import mongoose, { model, Schema } from "mongoose";
import { DATABASE_URL } from "./config.js";
mongoose.connect(DATABASE_URL)
.then(() => console.log("mongodb connected"))


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
export const UserModel = model("UserModel", userSchema);

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
})
export const Tag = model("Tag", tagSchema);

const contentSchema = new mongoose.Schema({
    title: String,
    link: String,
    tags: [ {type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: [{type: mongoose.Types.ObjectId, ref: 'UserModel', required: true}] 
})

export const Content = model("Content", contentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: [{ type: mongoose.Types.ObjectId, ref: 'UserModel', required: true, unique: true }],
})
export const LinkModel = model("LinkModel", LinkSchema);