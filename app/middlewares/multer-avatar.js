const multer = require("multer");

// Create storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format!" }, false);
  }
};

// Upload Middleware
const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
