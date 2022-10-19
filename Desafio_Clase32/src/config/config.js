import minimist from 'minimist';
import dotenv from 'dotenv';

const { PORT } = minimist(process.argv.slice(2), {
    alias:{
        p: "PORT"
    }, 
    default:{
        p: 8080
    }
})

const mode = process.argv.slice(2)[0];

dotenv.config({
    path: mode ==="PRODUCTION" ? './.env.production'
                               : './.env.development'
});

const config = {
    app: {
        MODE: process.env.MODE,
        PORT: PORT,
        DEBUG: process.env.DEBUG
    },

    mongo: {
        MONGO_URL: process.env.MONGO_URL,
    }
}

export default config;
