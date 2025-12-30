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
    userId: { type: ObjectId, ref: 'User' },
    finishedAt: { type: Date , default: null },
    createdAt: { 
        type: Date, 
        default: () => {
            const now = new Date();
            return new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        }
    }
});


const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);


module.exports = {
    UserModel,
    TodoModel,
    connectDB
}