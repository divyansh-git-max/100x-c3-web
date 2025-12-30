const express = require('express');
const { UserModel, TodoModel, connectDB } = require('./db');
const { auth } = require("./auth");
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const JWT_SECRET = 'secret';
const app = express();
app.use(express.json());

//validation functions
const  usernameValidation = z.string()
    .min(3, "username too short")
    .max(20, "username too long")
    .regex(/^[a-zA-Z0-9_]{3,20}$/, 
        "username must contain only letters, numbers, and underscores"
    );

const passwordValidation = z.string()
    .min(6, "Too Short")
    .max(20, "Too Long")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, 
        "password must contain at least one letter and one number"
    );


async function startServer() {
    await connectDB();
    
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

app.post('/signup', async (req, res) => {

    const requiredBody = z.object({
        username: usernameValidation,
        password: passwordValidation
    });

    const parsedBodyWithSuccess = requiredBody.safeParse(req.body);
    console.log(parsedBodyWithSuccess)
    if(!parsedBodyWithSuccess.success){
        return res.status(400).json({
            success: false,
            message: parsedBodyWithSuccess.error.issues
        });
    }

    const { username, password } = parsedBodyWithSuccess.data;



    const user = await UserModel.findOne({
        username: username
    });

    if (user)  {
        return res.status(403).json({
            success: false,
            message: parsedBodyWithSuccess.error.issues
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        await UserModel.create({
            username: username,
            password: hashedPassword,
        });

        res.json({
            success: true,
            message: 'user created'
        });
    } catch (error) {
        // Handle duplicate key error (E11000)
        if (error.code === 11000) {
            return res.status(403).json({
                success: false,
                message: 'user already exists'
            });
        }
        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'error creating user'
        });
    }
});


app.post('/signin', async (req, res) => {

    const requiredBody = z.object({
        username: usernameValidation,
        password: passwordValidation
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if(!parsedBody.success){
        return res.status(400).json({
            success: false,
            message: parsedBody.error.issues
        });
    }

    const { username, password } = parsedBody.data;


    const user = await UserModel.findOne({
        username: username
    });
    
    if (!user) {
        res.status(403).json({
            success: false,
            message: parsedBody.error.issues
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
       const token = jwt.sign({userId: user._id.toString()}, JWT_SECRET);
       res.json({
        token: token
       })
    }else{
        res.status(403).json({
            success: false,
            message: parsedBody.error.issues
        });
    }

});

app.get('/todos', auth, async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized'
        });
    }
    
    if (!isValidObjectId(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        });
    }

    const user = await UserModel.findById(userId);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    

    const todos = await TodoModel.find({
        userId: userId
    });
    
    res.json({
        todos
    });
});

app.post('/todo', auth, async (req, res) => {
    const userId = req.userId;
    const { text, done } = req.body;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized'
        });
    }
    
    if (!isValidObjectId(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        });
    }

    await TodoModel.create({
        text,
        done,
        userId,

    });
    
    res.json({
        success: true,
        message: 'Todo created'
    });
});

app.put('/todo/:id', auth, async (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;
    const done = true;
    

    const now = new Date();
    const finishedAt = now.getTime() + (5.5 * 60 * 60 * 1000);


    
    // Validate todoId
    if (!isValidObjectId(todoId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid todo ID'
        });
    }
    
    // Find and update the todo
    const updatedTodo = await TodoModel.findOneAndUpdate(
        { _id: todoId, userId: userId },
        { done, finishedAt: finishedAt },
        { new: true },
        
    );
    
    if (!updatedTodo) {
        return res.status(404).json({
            success: false,
            message: 'Todo not found or unauthorized'
        });
    }
    
    res.json({
        success: true,
        message: 'Todo updated',
        todo: updatedTodo
    });
});


startServer();