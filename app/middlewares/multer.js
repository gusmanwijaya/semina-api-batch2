const multer = require("multer");
// const multerS3 = require('multer-s3')

// START: Upload to local directory server
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/images/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime().toString() + "-" + file.originalname);
//   },
// });
// END: Upload to local directory server

// START: Upload to s3 aws service
const storage = multer.memoryStorage();
// END: Upload to s3 aws service

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000, //3 MB
  },
  fileFilter,
});

module.exports = uploadMiddleware;
