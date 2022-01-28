const multer = require("multer");
const path = require("path");

const { AppError } = require("./appError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = path.join(__dirname, "..", "img");
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    const newFileName = `${filename}-${new Date.now()}.${extension}`;

    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new AppError("Invalid file", 400));
  }

  cb(null, true);
};

const multerUpload = multer({ storage, fileFilter });

module.exports = { multerUpload };
