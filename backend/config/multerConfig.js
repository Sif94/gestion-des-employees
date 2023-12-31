import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // Define the destination folder for uploaded files
  },
  filename: async function (req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname)); // Define the filename
  }
});

const upload = multer({ storage: storage });

export default upload;
