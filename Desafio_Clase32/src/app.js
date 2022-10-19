import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import messagesRouter from './routes/messages.router.js';
import randomsRouter from './routes/random.router.js';
import messagesService from './models/Messages.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import flash from 'connect-flash';
import config from './config/config.js';
import winston from 'winston';
import moment from 'moment';

const app = express();

const PORT = config.app.PORT;

const server = app.listen(PORT, () => {
    // console.log(`Listening on port ${PORT}`)
    logger.info(`listening on port ${PORT}`)
});

const io = new Server(server);

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({
            level:'info'
        }),
        new winston.transports.File({
            level:'warn',
            filename:'warn.log'
        }),
        new winston.transports.File({
            level:'error',
            filename:'error.log'
        })
    ]
})

const connection = mongoose.connect(config.mongo.MONGO_URL, err=>{
    if (err) console.log(err);
    // else console.log('Connected to Atlas');
    else logger.info('Connected to Atlas');
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.MONGO_URL,
        ttl: 60
    }),
    secret: 'ABCDFG1234567890',
    resave: false,
    saveUninitialized: false
}))
app.use(function (req, res, next) {
    logger.info({
        date: moment().format(('DD/MM/YYYY hh:mm:ss')),
        method: req.method,
        url: req.url
    });
    next();
  });
app.use(flash());
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/randoms', randomsRouter);
app.get('/*', (req, res) => {
    logger.warn({
        date: moment().format(('DD/MM/YYYY hh:mm:ss')),
        method: req.method,
        url: req.url
    })
    res.render('error404');
})

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

io.on('connection', socket =>{
    // console.log("Cliente conectado en socket: " + socket.id);
    logger.info("Cliente conectado en socket: " + socket.id);

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
})