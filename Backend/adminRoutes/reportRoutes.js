import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  uploadReport,
  getReports,
  updateReport,
  deleteReport,
  getSingleReport,
} from "../controllers/reportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.array("files", 5), uploadReport);
router.get("/", getReports);

//  UPDATE
router.put("/:id", protect, upload.array("files", 5), updateReport);

//  DELETE
router.delete("/:id", protect,upload.any(), deleteReport);
router.get("/:id", getSingleReport);

export default router;
