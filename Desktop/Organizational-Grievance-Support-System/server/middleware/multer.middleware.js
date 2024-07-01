const multer = require('multer');

// import s from "../uploads"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueFileName = `${Date.now()}-${file.originalname}`
      cb(null, uniqueFileName);
    }
})

const upload = multer({
    storage,
})


module.exports = upload;