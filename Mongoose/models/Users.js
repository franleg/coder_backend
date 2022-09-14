import mongoose from 'mongoose';

const collection = 'users';

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student'
    },
    age: Number,
    active: Boolean,
    email: {
        type: String,
        default:'correodefault@hotmail.com'
    },
    dni:String,
    course:String,
    grade:Number
},{timestamps:true});

const usersService = mongoose.model(collection, usersSchema)

export default usersService;