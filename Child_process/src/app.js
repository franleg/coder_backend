import express from 'express';
import __dirname from './utils.js';
import { fork } from 'child_process';
import os from 'os';
import cluster from 'cluster';

const app = express();

const CPUs = os.cpus().length;

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

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