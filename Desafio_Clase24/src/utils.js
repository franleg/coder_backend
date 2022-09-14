import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/public/img")
    },
    filename: function(req, file, callback) {
        callback(null, Date.now()+"-"+file.originalname);
    }
});

const uploader = multer({storage : storage});

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export { __dirname, createHash, isValidPassword, uploader };