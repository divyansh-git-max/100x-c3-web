const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
// brcypt, zod, jsonwebtoken
const { z } = require("zod");
const bcrypt = require("bcrypt");

const  { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");



adminRouter.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.email().trim(),
        password: z.string().trim().min(6).max(100),
        firstName: z.string().trim().min(6).max(100),
        lastName: z.string().trim().min(2).max(100)
    });

    const { email, password, firstName, lastName } = requiredBody.safeParse(req.body).data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName
        })
        res.status(200).json({
            message: "Signup succeeded"
        })
    } catch(error) {
        res.status(400).json({
            message: "Signup failed"
        })
    }
})

adminRouter.post("/signin", async function(req, res) {
    const requiredBody = z.object({
        email: z.email().trim(),
        password: z.string().trim().min(6).max(100),
    });

    const { email, password } = requiredBody.safeParse(req.body).data;

    const admin = await adminModel.findOne({
        email: email,
    });
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (isPasswordValid) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const requiredBody = z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string().trim(),
        price: z.number().min(6).max(10000)
    });

    const parseResult = requiredBody.safeParse(req.body);
    
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parseResult.error.issues
        });
    }

    const { title, description, imageUrl, price } = parseResult.data;

    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    });

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const requiredBody = z.object({
        courseId: z.string(),
        title: z.string(),
        description: z.string(),
        imageUrl: z.string().trim(),
        price: z.number().min(6).max(10000)
    });

    const parseResult = requiredBody.safeParse(req.body);
    
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parseResult.error.issues
        });
    }

    const { courseId, title, description, imageUrl, price } = parseResult.data;

    try 
    {
        const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
    } catch(error) {
        res.status(400).json({
            message: "Course update failed"
        })
    }
})

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}