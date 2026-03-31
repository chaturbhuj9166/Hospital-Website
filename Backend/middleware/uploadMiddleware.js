import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// 🔥 FIXED FILTER (BEST)
const fileFilter = (req, file, cb) => {
  // console debug
  console.log("MIME:", file.mimetype);

  // ✅ allow images + pdf
  if (
    file.mimetype.startsWith("image") || 
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images & PDF allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });