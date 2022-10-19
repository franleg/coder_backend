import mongoose from 'mongoose';

const collection = 'messages';

const messagesSchema = new mongoose.Schema({
    author: Object,
    text: String,
    time: String,
});

const messagesService = mongoose.model(collection, messagesSchema);

export default messagesService;