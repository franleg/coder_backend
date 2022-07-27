import express from 'express';
import path from 'path';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.js';
import productsRouter from './routes/products.js';

const app = express();

const PORT = 8080;

const server = app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('*', (req,res)=>{
    res.render('error404');
})
