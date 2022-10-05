import express from 'express';
import __dirname from './utils.js';
import { fork } from 'child_process';

const app = express();

const server = app.listen(8080, () => console.log('Listening on port 8080'))

app.get('/', (req, res) => {
    res.send('Ok!')
})

app.get('/api/randoms', (req, res) => {
    let quantity;
    quantity = req.query.quantity;
    if(!req.query.quantity) quantity = 100000000;
    const child = fork( __dirname + '/operation.js');
    child.send(quantity)
    child.on('message', val => {
        res.send(JSON.stringify(val, null, '\t'))
    })
})