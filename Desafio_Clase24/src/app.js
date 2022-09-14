import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import messagesService from './models/Messages.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const server = app.listen(8080, () => console.log('Listening on port 8080'));
const io = new Server(server);
const connection = mongoose.connect('mongodb+srv://francolegnazzi:coderbackend@codercluster.skwuuph.mongodb.net/coderBase?retryWrites=true&w=majority', err=>{
    if (err) console.log(err);
    else console.log('Connected to Atlas');
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://francolegnazzi:coderbackend@codercluster.skwuuph.mongodb.net/coderBase?retryWrites=true&w=majority',
        ttl: 10
    }),
    secret: 'ABCDFG1234567890',
    resave: false,
    saveUninitialized: false
}))
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
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
        io.emit('server: messages', messages);
    })
});