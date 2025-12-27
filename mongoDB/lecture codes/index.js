const express = require('express');
const { UserModel, TodoModel, connectDB } = require('./db');
const { auth } = require("./auth");
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');

const JWT_SECRET = 'secret';
const app = express();
app.use(express.json());

async function startServer() {
    await connectDB();
    
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username: username,
        password: password
    });

    res.json({
        success: true,
        message: 'user created'
    });

});


app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username: username,
        password: password
    });

    if (user) {
       const token = jwt.sign({userId: user._id.toString()}, JWT_SECRET);
       res.json({
        token: token
       })
    }else{
        res.status(403).json({
            success: false,
            message: 'user not found'
        });
    }

});

app.get('/todos', auth, async (req, res) => {
    const userId = req.userId;
    
    const todos = await TodoModel.find({
        userId: userId
    });
    
    res.json({
        todos
    });
});

app.post('/todo', auth, async (req, res) => {
    const userId = req.userId;
    const text = req.body.text;
    const done = req.body.done;
    
    await TodoModel.create({
        text,
        done,
        userId
    });
    
    res.json({
        success: true,
        message: 'Todo created'
    });
});

app.put('/todo/:id', auth, async (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;
    const { text, done } = req.body;
    
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
        { text, done },
        { new: true }
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