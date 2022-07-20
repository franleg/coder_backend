import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "public/img")
    },
    filename: function(req, file, callback) {
        callback(null, Date.now()+"-"+file.originalname);
    }
});

const uploader = multer({storage : storage});

export { __dirname, uploader };