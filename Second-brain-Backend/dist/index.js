import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import { UserModel, Content, LinkModel } from "./db.js";
import { JWT_SECRET, PORT } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utilis.js";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const UserAlreadyExists = await UserModel.findOne({
        username
    });
    if (UserAlreadyExists) {
        return res.status(400).json({
            message: "user already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await UserModel.create({
        username,
        password: hashedPassword
    });
    return res.status(200).json({
        message: "user signed successfully"
    });
});
app.post("/api/v1/signin/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await UserModel.findOne({
        username
    });
    if (!user) {
        return res.status(400).json({
            message: "user not found"
        });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({
            message: "password is incorrect"
        });
    }
    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET);
    res.status(201).json({
        message: "user signed successfully",
        user: {
            _id: user._id,
            username: user.username,
            token
        }
    });
});
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    await Content.create({
        link,
        type,
        title,
        userId: req.userId, // userId is added by the middleware.
        tags: [] // Initialize tags as an empty array.
    });
    res.json({ message: "Content added" }); // Send success response.
});
app.get('/api/v1/content/', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await Content.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/content/", async (req, res) => {
    const contentId = req.body.contentId;
    await Content.deleteMany({
        contentId,
        userId: req.userId
    });
    res.json({
        msg: "content deleted"
    });
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    }
    else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});
app.get("/api/v1/brain/:sharelink/", async (req, res) => {
    const hash = req.params.sharelink;
    const link = await LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "invalid share link"
        });
        return;
    }
    const content = await Content.find({
        userId: link.userId
    });
    const user = await UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({
        username: user.username,
        content
    });
});
app.listen(PORT, () => {
    console.log(`server is running on port 3000`);
});
//# sourceMappingURL=index.js.map