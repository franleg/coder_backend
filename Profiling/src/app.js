import express from 'express';
import cluster from 'cluster';
import { cpus } from 'os';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';

const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == 'CLUSTER';

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length
 
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)
 
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
 
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
 } else {
    const app = express();

    app.engine('handlebars', handlebars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    app.use(express.json());
    app.use(express.static(__dirname + '/public'));
 
    // INFO DEBUG
    app.get('/infodebug', (req, res) => {
        const info = {
            arguments: process.argv,
            sistema_operativo: process.platform,
            node_version: process.version,
            memory: process.memoryUsage.rss(), 
            execution_path: process.execPath,
            process_id: process.pid,
            project_dir: process.cwd(),            
        }
        console.log(info)
        res.render('info', info)
    });

    // INFO NO DEBUG
    app.get('/infonodebug', (req, res) => {
        res.render('info', {
            arguments: process.argv,
            sistema_operativo: process.platform,
            node_version: process.version,
            memory: process.memoryUsage.rss(), 
            execution_path: process.execPath,
            process_id: process.pid,
            project_dir: process.cwd(),
        })
    });

    // RANDOM DEBUG
    app.get("/randomdebug", (req, res) => {
        let randoms = [];
        for (let i=0; i<10000; i++) {
            let random = Math.floor(Math.random()*9);
            console.log(random);
            randoms.push(random);
        }
        console.log(randoms);
        res.send(randoms)
    })

    // RANDOM NO DEBUG
    app.get("/randomnodebug", (req, res) => {
        let randoms = [];
        for (let i=0; i<10000; i++) {
            randoms.push(Math.floor(Math.random()*9));
        }
        res.send(randoms)
    })
 
    app.listen(PORT, () => {
        console.log(`Servidor express escuchando en el puerto ${PORT}`)
        console.log(`PID WORKER ${process.pid}`)
    })
 }