import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    adress: String,
    phone: String,
    email: String,
    password: String,
    avatar: String,
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

const usersModel = mongoose.model(collection, schema);

export default usersModel;