import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import viewsRouter from './routes/views.js';
import productsRouter from './routes/products.js';
import messagesRouter from './routes/messages.js';
import messagesService from './models/Messages.js';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));

mongoose.connect('mongodb+srv://francolegnazzi:coderbackend@codercluster.skwuuph.mongodb.net/coderBase?retryWrites=true&w=majority', err=>{
    if(err) console.log(err);
    else console.log('Connected to Atlas');
});

const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/messages', messagesRouter);
app.use('*', (req, res) => {
    res.render('error404');
})

io.on('connection', socket =>{
    console.log("Cliente conectado en socket: " + socket.id);

    socket.on('client: add product', data => {
        let products = data;
        io.emit('server: new product', products);
    })

    socket.on('client: delete product', data => {
        let products = data;
        io.emit('server: products', products);
    })

    socket.on('client: message', async(data) => {
        let newMessage = data;
        await messagesService.create(newMessage);
        let messages = await messagesService.find();
        io.emit('server: messages', {
            messages,
        });
    })
});