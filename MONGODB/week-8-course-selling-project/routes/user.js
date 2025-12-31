const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const  { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const {  z } = require("zod");
const bcrypt = require("bcrypt");



const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.email().trim(),
        password: z.string().trim().min(6).max(100),
        firstName: z.string().trim().min(6).max(100),
        lastName: z.string().trim().min(2).max(100)
    });

    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedBody.error.issues
        });
    }

    const { email, password, firstName, lastName } = parsedBody.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try { 
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName
        });
    
        res.json({
            message: "Signup succeeded"
        })
    } catch (error) {
        res.status(400).json({
            message: "Signup failed"
        })
    }
})

userRouter.post("/signin",async function(req, res) {
    const requiredBody = z.object({
        email: z.email().trim(),
        password: z.string().trim().min(6).max(100),
    });

    const { email, password } = requiredBody.safeParse(req.body).data;

    const user = await userModel.findOne({
        email: email
    })    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}