const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel , userModel} = require("../db")
const courseRouter = Router();

courseRouter.post("/purchase/:courseId", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = req.params.courseId;

    const user = await userModel.findOne({
        _id: userId
    });

    const course = await courseModel.findOne({
        _id: courseId
    })

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }

    if (user.purchasedCourses.includes(courseId)) {
        return res.status(400).json({
            message: "You have already bought this course"
        })
    }

    // should check that the user has actually paid the price

    await userModel.updateOne({
        email: user.email
    }, {
        $push: {
            purchasedCourses: courseId
        }
    })
    

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})

courseRouter.get("/preview", async function(req, res) {
    
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}