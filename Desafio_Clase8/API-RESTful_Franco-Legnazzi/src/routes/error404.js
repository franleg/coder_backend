import { Router } from 'express';
import path from 'path';

const __dirname = path.resolve();

const router = Router();

router.get('*', (req,res)=>{
    res.sendFile(__dirname + '/src/public/404.html');
})

export default router;