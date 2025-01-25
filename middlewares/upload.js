const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("File:", req.file);

    cb(null, "./uploads"); // Specify the directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create unique file names
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
//   console.log("FIle", file);

  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Initialize Multer
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
