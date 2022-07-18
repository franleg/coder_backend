import express from 'express';
import productsRouter from './routes/products.js';
import error404Router from './routes/error404.js';

const app = express();
const PORT = 8081;

const server = app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

app.use(express.json());

app.use(express.static('public'));

app.use('/api/products', productsRouter);

app.use('/', error404Router);
