const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


async function connectDB(){
    await mongoose.connect(''); // your cluster url
    console.log('DB connected');
}

const User = new Schema({
    username: { type: String, unique: true },
    password: String
});

const Todo = new Schema({
    text: String,
    done: Boolean,
    userId: { type: ObjectId, ref: 'User' }
});


const UserModel = mongoose.model('user', User);
const TodoModel = mongoose.model('todos', Todo);


module.exports = {
    UserModel,
    TodoModel,
    connectDB
}