import multer from 'multer';

const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      let date = new Date().toISOString().substring(0, 10);
      cb(null, date + "-" + file.originalname);
    },
  });
  
const upload = multer({ storage });

export default upload;

