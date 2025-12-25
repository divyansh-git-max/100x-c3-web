const express = require('express');
const { UserModel, TodoModel } = require('./db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';


const app = express();

app.use(express.json());


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
       const token = jwt.sign({id: user._id}, JWT_SECRET);
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

app.post('/todos', (req, res) => {
    
});

app.post('/todo', (req, res) => {
    
});


app.listen(3000);