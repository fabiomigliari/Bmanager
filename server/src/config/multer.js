import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) return cb(err);
      const fileName = hash.toString('hex') + extname(file.originalname);
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage });

export default upload;
